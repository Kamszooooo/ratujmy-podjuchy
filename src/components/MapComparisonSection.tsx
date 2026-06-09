import { useState, useRef, useCallback } from "react";

const MapComparisonSection = () => {
  const [sliderPosition, setSliderPosition] = useState(80);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const gestureRef = useRef<{
    pointerId: number;
    pointerType: string;
    startX: number;
    startY: number;
    decided: boolean;
    cancelled: boolean;
  } | null>(null);
  const allLoaded = imagesLoaded >= 2;

  const MOVE_THRESHOLD = 8; // px before we decide direction
  // tolerance 5%: only let the page scroll when the gesture is essentially
  // vertical (horizontal component ≤ 5% of vertical). Any diagonal motion
  // counts as slider interaction.
  const H_MIN_RATIO = 0.05;

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    gestureRef.current = {
      pointerId: e.pointerId,
      pointerType: e.pointerType,
      startX: e.clientX,
      startY: e.clientY,
      decided: false,
      cancelled: false,
    };

    if (e.pointerType !== "touch") {
      // Mouse / pen: behave as before — grab immediately.
      isDragging.current = true;
      gestureRef.current.decided = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    }
    // For touch: wait until move direction is clear; do not capture yet,
    // so the browser can still scroll the page vertically (touch-pan-y).
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const g = gestureRef.current;
    if (!g || g.pointerId !== e.pointerId) return;

    if (isDragging.current) {
      updatePosition(e.clientX);
      return;
    }

    if (g.cancelled || g.decided) return;

    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX < MOVE_THRESHOLD && absY < MOVE_THRESHOLD) return;

    if (absX >= absY * H_MIN_RATIO) {
      // Horizontal gesture — engage slider.
      g.decided = true;
      isDragging.current = true;
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        // ignore — capture may fail if element changed
      }
      updatePosition(e.clientX);
    } else {
      // Vertical (or near-vertical) gesture — let the page scroll.
      g.cancelled = true;
    }
  }, [updatePosition]);

  const endGesture = useCallback((e: React.PointerEvent) => {
    const g = gestureRef.current;
    if (g && g.pointerId === e.pointerId && !g.decided && !g.cancelled) {
      // Tap without significant movement — treat like a click and move slider there.
      updatePosition(e.clientX);
    }
    isDragging.current = false;
    gestureRef.current = null;
  }, [updatePosition]);

  return (
    <section className="pb-12 pt-0 px-4" id="mapa">
      <div className="max-w-xl mx-auto">
        {/* Captions */}
        <div className="flex justify-between mb-4 gap-4">
          <p className="text-xs md:text-base font-bold text-destructive max-w-[45%]">
            Miasto proponuje blokowisko
          </p>
          <p className="text-xs md:text-base font-bold text-primary text-right w-[55%]">
            Zamiast tego zachowajmy wzgórza i&nbsp;lasy, pozwólmy na&nbsp;zabudowę jednorodzinną!
          </p>
        </div>

        <div className="relative">
          {!allLoaded && (
            <div className="flex items-center justify-center rounded-2xl border border-border bg-muted/30 aspect-[379/443]">
              <p className="text-muted-foreground text-sm animate-pulse">Mapa się ładuje…</p>
            </div>
          )}

          <div
            ref={containerRef}
            className={`relative w-full overflow-hidden rounded-2xl border border-border shadow-lg cursor-col-resize select-none touch-pan-y transition-opacity duration-500 ${allLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endGesture}
            onPointerCancel={endGesture}
          >
            {/* Right image (full, behind) */}
            <img
              src="/images/mapa_right.webp"
              alt="Alternatywny plan - zabudowa jednorodzinna"
              className="block w-full h-auto"
              draggable={false}
              onLoad={() => setImagesLoaded(n => n + 1)}
            />

            {/* Left image (clipped) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="/images/mapa_left.webp"
                alt="Propozycja miasta - blokowisko"
                className="block w-full h-auto"
                draggable={false}
                onLoad={() => setImagesLoaded(n => n + 1)}
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
      </div>
    </section>
  );
};

export default MapComparisonSection;
