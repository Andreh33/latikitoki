"use client";

/** Capa de post-procesado tipo "pantalla futurista": scanlines + haz + viñeta. */
export function ScreenFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[58]" aria-hidden>
      <div className="screen-scanlines absolute inset-0" />
      <div className="screen-beam absolute inset-x-0 top-0 h-[26vh]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 50%, transparent 56%, rgba(0,0,0,0.5))",
        }}
      />
    </div>
  );
}
