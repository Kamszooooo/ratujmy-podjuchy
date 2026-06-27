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
import { ArrowLeft, LogOut, Pencil, Trash2, Plus, Upload, X } from "lucide-react";

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
};

function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 16);
}

const emptyDraft = {
  id: "",
  message: "",
  created_time: toLocalInput(new Date().toISOString()),
  permalink_url: "",
  image_url: "",
};

const AdminPage = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckDone, setAdminCheckDone] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // auth form
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

  // post form
  const [draft, setDraft] = useState(emptyDraft);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [thumbs, setThumbs] = useState<Record<string, string>>({});

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
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

  async function loadPosts() {
    setLoadingPosts(true);
    const { data, error } = await supabase
      .from("fb_posts")
      .select("id, message, created_time, permalink_url, image_url")
      .order("created_time", { ascending: false });
    if (error) {
      toast({ title: "Błąd ładowania", description: error.message, variant: "destructive" });
    } else {
      const list = (data ?? []) as Post[];
      setPosts(list);
      const entries = await Promise.all(
        list
          .filter((p) => p.image_url)
          .map(async (p) => [p.id, await resolveImageSrc(p.image_url)] as const),
      );
      setThumbs(Object.fromEntries(entries.filter(([, v]) => v)) as Record<string, string>);
    }
    setLoadingPosts(false);
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `posts/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      toast({ title: "Błąd wgrywania", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    // delete old upload if replacing a storage-hosted image
    if (draft.image_url && !isHttpUrl(draft.image_url)) {
      await supabase.storage.from(IMAGE_BUCKET).remove([draft.image_url]);
    }
    setDraft((d) => ({ ...d, image_url: path }));
    const preview = await resolveImageSrc(path);
    setImagePreview(preview);
    setUploading(false);
  }

  async function handleImageRemove() {
    if (draft.image_url && !isHttpUrl(draft.image_url)) {
      await supabase.storage.from(IMAGE_BUCKET).remove([draft.image_url]);
    }
    setDraft((d) => ({ ...d, image_url: "" }));
    setImagePreview(null);
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

  async function startEdit(p: Post) {
    setEditing(p.id);
    setDraft({
      id: p.id,
      message: p.message ?? "",
      created_time: toLocalInput(p.created_time),
      permalink_url: p.permalink_url ?? "",
      image_url: p.image_url ?? "",
    });
    setImagePreview(await resolveImageSrc(p.image_url));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditing(null);
    setDraft({ ...emptyDraft, created_time: toLocalInput(new Date().toISOString()) });
    setImagePreview(null);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!draft.message.trim()) {
      toast({ title: "Brak treści", description: "Wpisz treść posta.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const row = {
      id: editing ?? (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now())),
      message: draft.message.trim(),
      created_time: new Date(draft.created_time).toISOString(),
      permalink_url: draft.permalink_url.trim() || null,
      image_url: draft.image_url.trim() || null,
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
    } else {
      if (post?.image_url && !isHttpUrl(post.image_url)) {
        await supabase.storage.from(IMAGE_BUCKET).remove([post.image_url]);
      }
      toast({ title: "Usunięto" });
      void loadPosts();
    }
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
                  <Label htmlFor="image_file">Zdjęcie (opcjonalnie)</Label>
                  {imagePreview ? (
                    <div className="mt-1.5 flex items-start gap-3">
                      <img
                        src={imagePreview}
                        alt="Podgląd"
                        className="w-32 h-32 object-cover rounded-lg border border-border"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={handleImageRemove}>
                        <X className="w-3.5 h-3.5 mr-1.5" /> Usuń zdjęcie
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-1.5">
                      <label
                        htmlFor="image_file"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border bg-muted/30 hover:bg-muted cursor-pointer text-sm ${uploading ? "opacity-60 pointer-events-none" : ""}`}
                      >
                        <Upload className="w-4 h-4" />
                        {uploading ? "Wgrywanie…" : "Wgraj zdjęcie"}
                      </label>
                      <input
                        id="image_file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) void handleImageUpload(f);
                          e.target.value = "";
                        }}
                      />
                      <p className="text-xs text-muted-foreground mt-1.5">
                        Zdjęcie jest wgrywane na nasz serwer — bez zewnętrznych adresów.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
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
                    {p.image_url && (
                      <img src={p.image_url} alt="" className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground mb-1">
                        {new Date(p.created_time).toLocaleString("pl-PL")}
                      </div>
                      <p className="text-sm text-foreground line-clamp-3 whitespace-pre-line">
                        {p.message}
                      </p>
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
