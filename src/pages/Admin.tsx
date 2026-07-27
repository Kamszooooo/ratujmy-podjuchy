import { useEffect, useState, FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, LogOut, Pencil, Trash2, Plus, Upload, X, ChevronUp, ChevronDown } from "lucide-react";

const IMAGE_BUCKET = "fb-post-images";

function isHttpUrl(v: string | null | undefined): boolean {
  return !!v && /^https?:\/\//i.test(v);
}

async function resolveImageSrc(value: string | null): Promise<string | null> {
  if (!value) return null;
  if (isHttpUrl(value)) return value;
  const { data } = await supabase.storage.from(IMAGE_BUCKET).createSignedUrl(value, 3600);
  return data?.signedUrl ?? null;
}

type Post = {
  id: string;
  message: string | null;
  created_time: string;
  permalink_url: string | null;
  image_url: string | null;
  image_urls: string[];
};

function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 16);
}

type Draft = {
  message: string;
  created_time: string;
  permalink_url: string;
  image_urls: string[];
};

const emptyDraft = (): Draft => ({
  message: "",
  created_time: toLocalInput(new Date().toISOString()),
  permalink_url: "",
  image_urls: [],
});

const AdminPage = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckDone, setAdminCheckDone] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // auth
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

  // post form
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [thumbs, setThumbs] = useState<Record<string, string>>({}); // post.id -> first signed url

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(false);
      setAdminCheckDone(false);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
      setAdminCheckDone(true);
    })();
  }, [session]);

  useEffect(() => {
    if (!isAdmin) return;
    void loadPosts();
  }, [isAdmin]);

  function normalizeImages(p: { image_url: string | null; image_urls: string[] | null }): string[] {
    if (p.image_urls && p.image_urls.length > 0) return p.image_urls;
    return p.image_url ? [p.image_url] : [];
  }

  async function loadPosts() {
    setLoadingPosts(true);
    const { data, error } = await supabase
      .from("fb_posts")
      .select("id, message, created_time, permalink_url, image_url, image_urls")
      .order("created_time", { ascending: false });
    if (error) {
      toast({ title: "Błąd ładowania", description: error.message, variant: "destructive" });
      setLoadingPosts(false);
      return;
    }
    const list = (data ?? []).map((p) => ({
      ...p,
      image_urls: normalizeImages(p as Post),
    })) as Post[];
    setPosts(list);
    const entries = await Promise.all(
      list.map(async (p) => {
        const first = p.image_urls[0];
        if (!first) return [p.id, null] as const;
        return [p.id, await resolveImageSrc(first)] as const;
      }),
    );
    setThumbs(Object.fromEntries(entries.filter(([, v]) => v)) as Record<string, string>);
    setLoadingPosts(false);
  }

  async function refreshPreviews(paths: string[]) {
    const entries = await Promise.all(
      paths.map(async (p) => [p, await resolveImageSrc(p)] as const),
    );
    setPreviews(Object.fromEntries(entries.filter(([, v]) => v)) as Record<string, string>);
  }

  async function handleAuth(e: FormEvent) {
    e.preventDefault();
    setAuthBusy(true);
    const fn = authMode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn.call(supabase.auth, {
      email,
      password,
      ...(authMode === "signup"
        ? { options: { emailRedirectTo: `${window.location.origin}/admin` } }
        : {}),
    } as never);
    setAuthBusy(false);
    if (error) {
      toast({ title: "Błąd logowania", description: error.message, variant: "destructive" });
    } else {
      setEmail("");
      setPassword("");
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  async function handleClaimAdmin() {
    const { data, error } = await supabase.rpc("claim_admin");
    if (error) {
      toast({ title: "Nie udało się", description: error.message, variant: "destructive" });
      return;
    }
    if (data) {
      toast({ title: "Gotowe", description: "Masz teraz uprawnienia admina." });
      setIsAdmin(true);
    } else {
      toast({
        title: "Admin już istnieje",
        description: "Konto admina zostało już wcześniej utworzone.",
        variant: "destructive",
      });
    }
  }

  async function handleFilesSelected(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const newPaths: string[] = [];
    for (const file of Array.from(files)) {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `posts/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from(IMAGE_BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) {
        toast({ title: "Błąd wgrywania", description: error.message, variant: "destructive" });
      } else {
        newPaths.push(path);
      }
    }
    if (newPaths.length > 0) {
      const next = [...draft.image_urls, ...newPaths];
      setDraft((d) => ({ ...d, image_urls: next }));
      await refreshPreviews(next);
    }
    setUploading(false);
  }

  async function removeImageAt(idx: number) {
    const path = draft.image_urls[idx];
    if (path && !isHttpUrl(path)) {
      await supabase.storage.from(IMAGE_BUCKET).remove([path]);
    }
    const next = draft.image_urls.filter((_, i) => i !== idx);
    setDraft((d) => ({ ...d, image_urls: next }));
  }

  function moveImage(idx: number, dir: -1 | 1) {
    const next = [...draft.image_urls];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setDraft((d) => ({ ...d, image_urls: next }));
  }

  async function startEdit(p: Post) {
    setEditing(p.id);
    const imgs = normalizeImages(p);
    setDraft({
      message: p.message ?? "",
      created_time: toLocalInput(p.created_time),
      permalink_url: p.permalink_url ?? "",
      image_urls: imgs,
    });
    await refreshPreviews(imgs);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditing(null);
    setDraft(emptyDraft());
    setPreviews({});
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!draft.message.trim()) {
      toast({ title: "Brak treści", description: "Wpisz treść posta.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const id = editing ?? (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()));
    const row = {
      id,
      message: draft.message.trim(),
      created_time: new Date(draft.created_time).toISOString(),
      permalink_url: draft.permalink_url.trim() || null,
      image_url: draft.image_urls[0] ?? null, // legacy mirror
      image_urls: draft.image_urls,
      fetched_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("fb_posts").upsert(row, { onConflict: "id" });
    setSaving(false);
    if (error) {
      toast({ title: "Błąd zapisu", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Zaktualizowano" : "Dodano post" });
    resetForm();
    void loadPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Na pewno usunąć ten post?")) return;
    const post = posts.find((p) => p.id === id);
    const { error } = await supabase.from("fb_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Błąd usuwania", description: error.message, variant: "destructive" });
      return;
    }
    const toRemove = (post?.image_urls ?? []).filter((p) => p && !isHttpUrl(p));
    if (toRemove.length > 0) {
      await supabase.storage.from(IMAGE_BUCKET).remove(toRemove);
    }
    toast({ title: "Usunięto" });
    void loadPosts();
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Panel administratora — Ratujmy Podjuchy</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Wróć na stronę
          </Link>
          {session && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline">{session.user.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-1.5" /> Wyloguj
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Panel administratora</h1>
        <p className="text-muted-foreground mb-8">Dodawaj, edytuj i usuwaj posty wyświetlane w sekcji „Aktualności".</p>

        {checkingSession && <p className="text-muted-foreground">Ładowanie…</p>}

        {!checkingSession && !session && (
          <div className="max-w-sm bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex gap-2 mb-5">
              <button
                type="button"
                onClick={() => setAuthMode("signin")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg ${authMode === "signin" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                Zaloguj
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg ${authMode === "signup" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                Zarejestruj
              </button>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">Hasło</Label>
                <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={authBusy}>
                {authBusy ? "..." : authMode === "signin" ? "Zaloguj" : "Załóż konto"}
              </Button>
            </form>
          </div>
        )}

        {session && adminCheckDone && !isAdmin && (
          <div className="max-w-xl bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Konto bez uprawnień</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Jeśli to pierwsze konto na stronie, kliknij poniżej, aby zostać administratorem.
              W przeciwnym razie poproś istniejącego admina o nadanie uprawnień.
            </p>
            <Button onClick={handleClaimAdmin}>Zostań pierwszym adminem</Button>
          </div>
        )}

        {session && isAdmin && (
          <div className="space-y-10">
            <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editing ? "Edytuj post" : "Nowy post"}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <Label htmlFor="message">Treść *</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={draft.message}
                    onChange={(e) => setDraft({ ...draft, message: e.target.value })}
                    placeholder="Treść posta…"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="created_time">Data publikacji</Label>
                    <Input
                      id="created_time"
                      type="datetime-local"
                      required
                      value={draft.created_time}
                      onChange={(e) => setDraft({ ...draft, created_time: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="permalink_url">Link do posta na FB</Label>
                    <Input
                      id="permalink_url"
                      type="url"
                      value={draft.permalink_url}
                      onChange={(e) => setDraft({ ...draft, permalink_url: e.target.value })}
                      placeholder="https://www.facebook.com/…"
                    />
                  </div>
                </div>

                <div>
                  <Label>Zdjęcia (opcjonalnie, można dodać kilka)</Label>
                  {draft.image_urls.length > 0 && (
                    <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                      {draft.image_urls.map((path, idx) => (
                        <div
                          key={path}
                          className="relative group rounded-lg overflow-hidden border border-border bg-muted/30"
                        >
                          {previews[path] ? (
                            <img src={previews[path]} alt="" className="w-full aspect-square object-cover" />
                          ) : (
                            <div className="w-full aspect-square animate-pulse bg-muted" />
                          )}
                          {idx === 0 && (
                            <span className="absolute top-1.5 left-1.5 text-[10px] font-bold uppercase tracking-wide bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                              Główne
                            </span>
                          )}
                          <div className="absolute inset-x-0 bottom-0 p-1.5 flex items-center justify-between gap-1 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => moveImage(idx, -1)}
                                disabled={idx === 0}
                                className="p-1 rounded bg-background/90 hover:bg-background disabled:opacity-40"
                                aria-label="W górę"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveImage(idx, 1)}
                                disabled={idx === draft.image_urls.length - 1}
                                className="p-1 rounded bg-background/90 hover:bg-background disabled:opacity-40"
                                aria-label="W dół"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImageAt(idx)}
                              className="p-1 rounded bg-background/90 hover:bg-destructive hover:text-destructive-foreground"
                              aria-label="Usuń zdjęcie"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <label
                    htmlFor="image_files"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border bg-muted/30 hover:bg-muted cursor-pointer text-sm ${uploading ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    <Upload className="w-4 h-4" />
                    {uploading ? "Wgrywanie…" : draft.image_urls.length > 0 ? "Dodaj kolejne zdjęcia" : "Wgraj zdjęcia"}
                  </label>
                  <input
                    id="image_files"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      void handleFilesSelected(e.target.files);
                      e.target.value = "";
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Zdjęcia są wgrywane na nasz serwer — bez zewnętrznych adresów. Pierwsze zdjęcie jest „główne".
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={saving || uploading}>
                    {saving ? "Zapisywanie…" : editing ? "Zapisz zmiany" : "Dodaj post"}
                  </Button>
                  {editing && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Anuluj
                    </Button>
                  )}
                </div>
              </form>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Posty ({posts.length})</h2>
              {loadingPosts && <p className="text-muted-foreground text-sm">Ładowanie…</p>}
              {!loadingPosts && posts.length === 0 && (
                <p className="text-muted-foreground text-sm">Brak postów. Dodaj pierwszy powyżej.</p>
              )}
              <ul className="space-y-3">
                {posts.map((p) => (
                  <li key={p.id} className="bg-card border border-border rounded-xl p-4 flex gap-4">
                    {thumbs[p.id] && (
                      <div className="relative flex-shrink-0">
                        <img src={thumbs[p.id]} alt="" className="w-20 h-20 object-cover rounded-lg" />
                        {p.image_urls.length > 1 && (
                          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {p.image_urls.length}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground mb-1">
                        {new Date(p.created_time).toLocaleString("pl-PL")}
                      </div>
                      <p className="text-sm text-foreground line-clamp-3 whitespace-pre-line">{p.message}</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline" onClick={() => startEdit(p)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
