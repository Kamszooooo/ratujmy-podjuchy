import { Camera } from "lucide-react";

// TODO: zdjęcia terenu zostaną dodane przez użytkownika.
// Po otrzymaniu plików należy wypełnić tę tablicę obiektami { src, alt }.
const photos: { src: string; alt: string }[] = [];

const PhotosSection = () => {
  return (
    <section className="px-4 py-16 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Zdjęcia terenu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Zobacz, jak wygląda obszar Górnych Podjuch zagrożony zabudową wielorodzinną.
          </p>
        </div>

        {photos.length === 0 ? (
          <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center text-muted-foreground bg-card">
            <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="font-medium">Galeria zdjęć wkrótce</p>
            <p className="text-sm mt-1">Materiały zdjęciowe pojawią się tutaj wkrótce.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((p) => (
              <div key={p.src} className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted">
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotosSection;
