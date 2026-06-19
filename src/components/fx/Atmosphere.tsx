"use client";

import dynamic from "next/dynamic";

const AtmosphereCanvas = dynamic(() => import("./AtmosphereCanvas"), {
  ssr: false,
});

/** Atmósfera WebGL persistente detrás de toda la web (reacciona a ratón + scroll). */
export function Atmosphere() {
  return <AtmosphereCanvas />;
}
