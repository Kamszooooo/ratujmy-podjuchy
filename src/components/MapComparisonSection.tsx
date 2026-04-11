import { useState, useRef, useCallback } from "react";

const MapComparisonSection = () => {
  const [sliderPosition, setSliderPosition] = useState(80);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section className="pb-12 pt-0 px-4" id="mapa">
      <div className="max-w-xl mx-auto">
        {/* Captions */}
        <div className="flex justify-between mb-4 gap-4">
          <p className="text-sm md:text-base font-semibold text-destructive max-w-[45%]">
            Miasto proponuje blokowisko
          </p>
          <p className="text-sm md:text-base font-semibold text-primary text-right w-[55%]">
            Zamiast tego zachowajmy wzgórza i&nbsp;lasy, pozwólmy na&nbsp;zabudowę jednorodzinną
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-2xl border border-border shadow-lg cursor-col-resize select-none touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Right image (full, behind) */}
          <img
            src="/images/mapa_right.svg"
            alt="Alternatywny plan - zabudowa jednorodzinna"
            className="block w-full h-auto"
            draggable={false}
          />

          {/* Left image (clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src="/images/mapa_left.svg"
              alt="Propozycja miasta - blokowisko"
              className="block w-full h-auto"
              draggable={false}
            />
          </div>

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary shadow-md -translate-x-1/2 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary border-2 border-primary-foreground shadow-lg flex items-center justify-center pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary-foreground">
                <path d="M6 10L2 10M2 10L5 7M2 10L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 10L18 10M18 10L15 7M18 10L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComparisonSection;
