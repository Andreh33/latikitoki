# 💜 La TikiToki

**La tienda de lo viral, antes que nadie.** Web one-page inmersiva con scroll interactivo, WebGL real y textos que se iluminan — pensada para una marca joven de estética TikTok (lila + azul claro). Algo que en WordPress o Shopify es impensable.

> Demo lista para producción. Falta solo: fotos reales de producto, claves de pasarela de pago y conectar el formulario de email. Todo está preparado para enchufarlo.

---

## ✨ Qué incluye

- **Hero WebGL**: fondo aurora holográfica por shader (GLSL propio, sin assets) + cristal facetado que refracta la aurora (React Three Fiber + drei) + partículas.
- **Textos que se iluminan al hacer scroll** (la interacción firma) — GSAP ScrollTrigger, palabra a palabra.
- **Scroll suave** (Lenis) sincronizado con GSAP.
- **Scroller horizontal fijado** ("Lo que se lleva") con pin + scrub en desktop y swipe nativo en móvil.
- **Bento de categorías** que filtra la tienda al tocar.
- **Tienda filtrable** con tarjetas holográficas, badges, ratings y descuentos.
- **Vista rápida** (modal) + **carrito deslizante** con persistencia (localStorage), barra de envío gratis y checkout listo para Stripe.
- **Cursor con rastro de purpurina**, barra de progreso **cometa**, marquesinas infinitas, menú móvil, grano de película.
- **Responsive** y con respeto básico a `prefers-reduced-motion` (sin capar la experiencia).

### 🎮 Extras virales (lo que no tiene nadie)
- **Intro cinematográfica** con la mascota **Tiki** y reveal líquido.
- **Render del hero vivo**: la aurora cambia de color gradualmente según la hora del día (lila → azul → amarillo → naranja) en 24h, con bloom.
- **Producto del mes** destacado en la home.
- **Zona de juegos**: Caja Sorpresa (premio diario), ¿Cuál es más caro? (higher/lower con productos reales) y **Tiki Studio** (graba un clip con Tiki y descárgalo para TikTok).
- **Club TikiToki**: racha diaria con **taza 3D** a los 35 días, referidos (5€), y **fondos de móvil** descargables.
- **PWA instalable** (manifest + service worker) con aviso semanal.
- **404 jugable** y logo con las **T latiendo**.

## 🧱 Stack

| Pieza | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript |
| Estilos | Tailwind CSS v4 (tokens en `globals.css`) |
| Scroll / animación | GSAP + ScrollTrigger · Lenis · Motion (ex Framer Motion) |
| 3D / WebGL | Three.js · @react-three/fiber · @react-three/drei |
| Tipografías | Bricolage Grotesque (display) · Geist Sans (texto) · Geist Mono (etiquetas) |

## 🚀 Arrancar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
```

## 📁 Estructura

```
src/
├─ app/                  layout (fuentes, metadata), page (ensambla secciones), globals.css (sistema de diseño)
├─ components/
│  ├─ providers/         Cart, QuickView, SmoothScroll(Lenis), Providers (shell global)
│  ├─ ui/                Cursor, Magnetic, ScrollProgress, Marquee
│  ├─ text/              ScrollIlluminate (texto que se enciende), Reveal
│  └─ sections/          Hero, HeroCanvas(R3F), Manifesto, Featured, Categories,
│                        Catalog, ProductCard, ProductMedia, QuickView, CartDrawer,
│                        Values, SocialWall, Newsletter, Footer, Nav, Preloader
├─ hooks/                useMediaQuery
└─ lib/                  products.ts (catálogo de la web) · utils.ts
docs/                    Catálogo 150 productos · Plan TikTok · Plan Instagram+Funnel · Guía de marca · 100 ideas
```

## 🛠️ Cómo personalizar

### Añadir fotos reales de producto
Cada producto en `src/lib/products.ts` admite un campo `image`. Mientras no exista, se pinta un mosaico holográfico coherente (nunca una imagen rota).
```ts
{ id: "proyector-galaxia-aurora", name: "...", image: "/productos/galaxia.jpg", ... }
```
Pon las fotos en `public/productos/`. Para fuentes externas (CDN del proveedor), añade el dominio en `next.config.ts → images.remotePatterns`.

### Añadir o quitar productos
Edita el array `PRODUCTS` en `src/lib/products.ts`. El catálogo completo de 150 (con costes y enlaces) está en `docs/CATALOGO-150-PRODUCTOS.md`. Marca `featured: true` para que salga en el scroller horizontal.

### Cambiar la paleta
Todos los colores y tipografías son tokens en `src/app/globals.css` (`@theme` y `:root`). Cambia `--color-lila`, `--color-azul`, `--holo`, etc. y toda la web se actualiza.

### Conectar el pago (Stripe Checkout)
El carrito ya está construido; el botón "Tramitar pedido" muestra el paso final preparado. Para activarlo: crea una API route que genere una *Checkout Session* de Stripe con las líneas del carrito y redirige. Recomendado: Stripe Checkout (soporta tarjeta, Apple/Google Pay y Bizum en España).

### Conectar el email ("El Drop")
El formulario de `Newsletter.tsx` valida y muestra el estado de éxito en cliente. Conéctalo a tu proveedor (Klaviyo, Brevo, Mailchimp, Resend) con una API route en el `onSubmit`.

### Analítica
Añade Vercel Analytics o GA4 en `layout.tsx`. Usa parámetros UTM en el link de la bio (ver plan de TikTok).

## ☁️ Desplegar en Vercel
1. Sube el repo a GitHub.
2. Importa el proyecto en Vercel (detecta Next.js automáticamente).
3. Deploy. Sin configuración extra.

## 📚 Documentos de negocio (`/docs`)
- **CATALOGO-150-PRODUCTOS.md** — 150 productos (50 Alibaba · 50 AliExpress · 50 Shein) con enlaces, costes, PVP, margen y ángulo viral.
- **PLAN-TIKTOK.md** — de 0 a marca en TikTok sin grabar producto físico + embudo a la web.
- **PLAN-INSTAGRAM-Y-FUNNEL.md** — Instagram desde 0 + arquitectura completa del embudo y conversión.
- **GUIA-MARCA-Y-ARRANQUE.md** — biblia de marca + checklist operativo y legal para arrancar en España.
- **100-IDEAS.md** — 100 ideas (algunas locas) para llevar la web y la marca al siguiente nivel.

---

Hecho con 💜 para La TikiToki.
