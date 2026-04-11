import { MapPin } from "lucide-react";

const MapSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="w-full min-h-[400px] rounded-2xl border-2 border-dashed border-border bg-card flex flex-col items-center justify-center gap-4">
          <MapPin className="w-16 h-16 text-muted-foreground/40" />
          <p className="text-muted-foreground text-lg font-medium">Mapa — plik SVG zostanie dodany wkrótce</p>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
