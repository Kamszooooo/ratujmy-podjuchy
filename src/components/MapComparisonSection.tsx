import { useState, useRef, useCallback, useEffect } from "react";

const DEFAULT_POSITION = 57;
const HINT_LEFT = 42;
const HINT_RIGHT = 72;

const MapComparisonSection = () => {
  const [sliderPosition, setSliderPosition] = useState(DEFAULT_POSITION);
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

  const hasHinted = useRef(false);
  const isHinting = useRef(false);
  const rafId = useRef<number | null>(null);
  const currentPositionRef = useRef(sliderPosition);

  useEffect(() => {
    currentPositionRef.current = sliderPosition;
  }, [sliderPosition]);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

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

  const cancelHint = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    isHinting.current = false;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isHinting.current) {
      cancelHint();
    }

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
  }, [updatePosition, cancelHint]);

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

  // Hint animation: runs once when the map first scrolls into view.
  useEffect(() => {
    console.log("[HINT] effect running", { allLoaded, hasHinted: hasHinted.current, isHinting: isHinting.current, isDragging: isDragging.current, hasContainer: !!containerRef.current });
    if (typeof window === "undefined") return;
    if (!containerRef.current || !allLoaded) return;
    if (hasHinted.current || isHinting.current || isDragging.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    console.log("[HINT] reduced motion", reducedMotion.matches);
    if (reducedMotion.matches) return;

    const runHint = () => {
      console.log("[HINT] runHint called");
      if (isHinting.current || hasHinted.current) return;
      isHinting.current = true;
      hasHinted.current = true;

      const steps = [
        { to: HINT_LEFT, duration: 450 },
        { to: HINT_RIGHT, duration: 600 },
        { to: DEFAULT_POSITION, duration: 450 },
      ];

      let stepIndex = 0;
      let startTime: number | null = null;
      let from = currentPositionRef.current;

      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const tick = (timestamp: number) => {
        if (!isHinting.current) return;
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const { to, duration } = steps[stepIndex];
        const rawProgress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(rawProgress);
        const value = from + (to - from) * eased;
        setSliderPosition(value);

        if (rawProgress < 1) {
          rafId.current = requestAnimationFrame(tick);
        } else {
          stepIndex++;
          if (stepIndex < steps.length) {
            startTime = null;
            from = to;
            rafId.current = requestAnimationFrame(tick);
          } else {
            isHinting.current = false;
            rafId.current = null;
          }
        }
      };

      rafId.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("[HINT] observer entry", entry.isIntersecting, entry.intersectionRatio);
          if (
            entry.isIntersecting &&
            !hasHinted.current &&
            !isHinting.current &&
            !isDragging.current &&
            !reducedMotion.matches
          ) {
            runHint();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [allLoaded]);

  return (
    <section className="pb-12 pt-0 px-4" id="mapa">
      <div className="max-w-xl mx-auto">
        {/* Captions with arrows pointing toward each side of the map */}
        <div className="flex justify-between items-stretch mb-3 gap-3">
          <div className="flex items-start gap-2 max-w-[45%]">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-destructive shrink-0 mt-1" aria-hidden="true">
              <path d="M14 10L2 10M2 10L7 5M2 10L7 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-xs md:text-base font-bold text-destructive leading-tight">
              Miasto proponuje blokowisko
            </p>
          </div>
          <div className="flex items-start gap-2 w-[55%] justify-end">
            <p className="text-xs md:text-base font-bold text-primary text-right leading-tight">
              Zamiast tego zachowajmy wzgórza i&nbsp;lasy, pozwólmy na&nbsp;zabudowę jednorodzinną!
            </p>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-primary shrink-0 mt-1" aria-hidden="true">
              <path d="M6 10L18 10M18 10L13 5M18 10L13 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
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

            {/* Corner labels on the map itself */}
            {allLoaded && (
              <>
                <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-destructive text-destructive-foreground text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-md pointer-events-none">
                  Plan miasta
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-primary text-primary-foreground text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-md pointer-events-none">
                  Nasza propozycja
                </div>
              </>
            )}

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

          {allLoaded && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Przeciągnij suwak w lewo lub w prawo, aby porównać
            </p>
          )}
        </div>

      </div>
    </section>
  );
};

export default MapComparisonSection;
