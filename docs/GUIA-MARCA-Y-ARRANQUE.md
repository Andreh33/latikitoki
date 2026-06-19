# 🧭 La TikiToki — Guía de Marca y Arranque desde 0

> Documento que une todas las piezas: **la web + el catálogo + el plan de TikTok + el plan de Instagram**.
> Aquí está el "por qué" de cada decisión y el orden exacto para arrancar sin dejar nada al aire.
> Mercado: España · Fecha: junio 2026.

---

## 1. La marca en una frase

**La TikiToki es la tienda de lo viral, antes que nadie.** No vendemos objetos sueltos: vendemos *ese momento* en el que se te para el scroll y piensas "lo necesito". Curamos lo que va a petar, lo presentamos de forma irresistible y lo enviamos a toda España.

**Posicionamiento:** la tienda *bestie* de la Gen-Z española. Ni marketplace frío (AliExpress) ni cadena impersonal (Shein): una marca con voz, criterio y estética propia que te ahorra el trabajo de buscar.

**Por qué funciona:** el público joven no compra en webs feas con 10.000 productos. Compra donde la estética, la confianza y la sensación de "esto es para mí" se alinean. Esa es nuestra ventaja frente al dropshipper genérico.

---

## 2. Identidad visual (ya implementada en la web)

### Nombre
**La TikiToki.** Sonoro, juguetón, fácil de recordar y de etiquetar (#latikitoki). Evoca ritmo, tic-tac de tendencia ("lo de ahora") y el universo TikTok sin depender de él.

### Paleta — "Aurora holográfica sobre noche violeta"
| Token | Hex | Uso |
|---|---|---|
| Noche | `#070411` | Fondo base (lienzo oscuro premium que hace brillar el neón) |
| Lila | `#b7a2ff` | Color de marca primario |
| Violeta | `#6d3bf5` | Acento profundo, glows |
| Azul claro | `#82e6ff` | Color secundario |
| Rosa holo | `#ff97d6` | Tercer tono del degradado iridiscente |
| Crema | `#f4f0ff` | Texto |
| Degradado firma | `linear-gradient(105deg, #b7a2ff, #82e6ff, #ff97d6)` | Botones, títulos, detalles |

**Por qué oscuro + neón:** sobre noche profunda, el lila/azul/rosa *brillan* y los textos pueden "encenderse" al hacer scroll (interacción firma). En fondo claro perderían toda la magia. Además casi ningún dropshipper español va oscuro premium: nos diferencia al instante.

### Tipografía
- **Display:** Bricolage Grotesque (expresiva, joven, con carácter — para los titulares grandes).
- **Texto:** Geist Sans (limpia y moderna).
- **Etiquetas/precios:** Geist Mono (monoespaciada — da ese aire "tech/drop" en eyebrows y precios).

### Logo
Wordmark "tikitoki" + un disco con la "T" recortada en degradado holográfico. Minimal, escalable, reconocible en un avatar de 40px.

### Tono de voz
Cercano, gracioso, en segunda persona, sin postureo corporativo. Habla como tu amiga que siempre sabe lo que se lleva. Ejemplos reales de la web: *"Lo viral, antes que nadie"*, *"Tu cuarto, tu glow-up, tu vibe"*, *"Sí. Hay muchísimo más abajo."*

---

## 3. La promesa y los valores (visibles en la web)

1. **Curado a mano** — no te abrumamos; solo lo que mola y funciona.
2. **Precios sin postureo** — lo que ves es lo que pagas.
3. **Envío a toda España** — 24–72h con seguimiento.
4. **Soporte humano** — te contestamos por WhatsApp como una amiga.

> **Regla de oro de honestidad:** nunca usamos escasez falsa ("quedan 2", cuentas atrás mentirosas) ni cifras de ventas inventadas. En España es **ilegal** (competencia desleal) y dispara reembolsos y mala reputación. La urgencia se construye con **drops reales** y **ediciones limitadas reales**, no con mentiras.

---

## 4. Cómo funciona el negocio (sin stock)

- **Nunca compramos inventario.** Cuando un cliente compra, el pedido se cursa al proveedor (Alibaba/AliExpress/Shein) que envía directo. Internamente es dropshipping.
- **De cara al público:** marca propia "La TikiToki", "preparado con mimo", envíos a toda España. **Jamás** se menciona el origen ni los plazos de fábrica.
- **El reto y su solución:** al no tener producto en mano, el contenido NO puede ser unboxing real. Se resuelve con contenido faceless, b-roll, UGC del proveedor *con derechos*, IA y storytelling de marca (todo desarrollado en `PLAN-TIKTOK.md`).
- **Plazos honestos:** comunica 24–72h solo en lo que tengas con proveedor "Choice"/almacén España. Para lo que venga de Asia, sé honesto con el plazo o usa proveedores con stock europeo. **Prometer 24h y entregar en 20 días = reembolsos masivos.**

---

## 5. Checklist operativo y legal (España) — el "aburrido pero imprescindible"

> Sin esto la web es solo un escaparate. Esto la convierte en un negocio real.

- [ ] **Alta de autónomo** (RETA) + **alta censal (modelo 036/037)** con epígrafe de comercio al por menor / online. (Tarifa plana primer año.)
- [ ] **IVA:** repercutir el 21% general; presentar modelo 303 trimestral. Si vendes a otros países UE, valora el **OSS**.
- [ ] **Proveedores:** vetar con la checklist del catálogo (valoración ≥4.6, reviews reales, **Trade Assurance** en Alibaba, envío "Choice"/ePacket a España, muestras antes de listar). Pedir siempre una **muestra** del top 5 de productos.
- [ ] **Pasarela de pago:** Stripe (tarjeta + Apple/Google Pay) **+ Bizum** (imprescindible en España para público joven) + PayPal opcional. Integrar Stripe Checkout en el botón ya preparado del carrito.
- [ ] **Política de envíos** clara y realista (plazos, costes, umbral de envío gratis = 30 €, ya implementado).
- [ ] **Devoluciones:** derecho de desistimiento **14 días** (obligatorio UE) bien explicado.
- [ ] **Textos legales:** Aviso legal, Política de privacidad (**RGPD/LOPDGDD**), Política de cookies + banner de consentimiento, Términos y condiciones. (Enlaces ya colocados en el footer, falta el contenido.)
- [ ] **Atención al cliente:** WhatsApp Business + email. Plantillas de respuesta rápidas.
- [ ] **Dominio + email pro:** latikitoki.com (o .es) + hola@latikitoki.com.
- [ ] **Analítica + píxeles:** GA4 / Vercel Analytics + píxel de TikTok e Instagram para retargeting.

---

## 6. Sprint de lanzamiento — 30 días, todo combinado

> Detalle por canal en `PLAN-TIKTOK.md` y `PLAN-INSTAGRAM-Y-FUNNEL.md`. Aquí, la secuencia maestra.

### Semana 0 — Cimientos (antes de publicar nada)
- Cerrar identidad (ya hecha), comprar dominio, desplegar la web en Vercel.
- Crear @latikitoki en TikTok e Instagram (bio + avatar + link en bio a la web).
- Elegir el **TOP 10 para lanzar** del catálogo (mejor margen + viralidad). Pedir muestras.
- Montar pasarela de pago y textos legales.

### Semana 1 — Calentar cuentas + primeros productos
- Subir 1–2 vídeos/día (faceless, b-roll, "cosas que no sabías que necesitabas").
- Publicar en la web solo el TOP 10 con fotos/clips ya conseguidos.
- Empezar a captar email con el pop-up de bienvenida (−10%).

### Semana 2 — Buscar el primer pico
- Doblar el formato/gancho que mejor retención dé (leer analytics).
- Primer **drop temático** semanal ("El Drop"): 3–5 productos nuevos con aviso a la lista.
- Activar comment-to-DM ("escribe DROP y te paso el link").

### Semana 3 — Conversión
- Sembrar producto/UGC con 3–5 micro-creadores (sin coste, a cambio de producto/afiliación).
- Optimizar la ficha con la prueba social que vaya llegando (reseñas reales).
- Primeros flujos automáticos: carrito abandonado (email + WhatsApp).

### Semana 4 — Escalar lo que funciona
- Ampliar catálogo a 25–30 productos (los que tengan tracción).
- Valorar primeras **Spark Ads** sobre el vídeo orgánico que ya petó (nunca antes).
- Revisar márgenes reales (coste actualizado, comisión pasarela, coste de envío) y reajustar PVP.

---

## 7. KPIs y números de referencia (España)

| Métrica | Referencia realista al arrancar |
|---|---|
| Conversión web | 1–2 % (objetivo inicial ~1,4 %) |
| Ticket medio (AOV) | 25–50 € (subir con bundles y umbral de envío gratis a 30 €) |
| Margen bruto medio | 60–70 % (antes de pasarela, envío y ads) |
| CTR del link en bio | 5–15 % de quien visita el perfil |
| Relación LTV/CAC | ≥ 3 antes de escalar inversión en ads |

> El margen **bruto** no es beneficio: resta comisión de pasarela (~1,5–2,9 %), coste de envío real, devoluciones, ads e IVA. Calcula el margen **neto** por producto antes de fijar el PVP definitivo.

---

## 8. Errores que matan el proyecto (y cómo evitarlos)

1. **Prometer plazos imposibles** → usa proveedores con stock europeo o sé honesto. (Reembolsos = muerte.)
2. **Escasez/reseñas falsas** → ilegal y contraproducente. Urgencia real con drops.
3. **Resubir el clip del proveedor con marca de agua** → causa #1 de shadowban en TikTok 2026. Exporta máster limpio.
4. **Vender de todo** → diluye la marca. Mantén el criterio "curado a mano".
5. **No medir** → instala analítica desde el día 1 y dobla solo lo que funciona.

---

**Siguiente paso recomendado:** lee `PLAN-TIKTOK.md` para el contenido, `PLAN-INSTAGRAM-Y-FUNNEL.md` para el embudo, elige el TOP 10 de `CATALOGO-150-PRODUCTOS.md`, y mira `100-IDEAS.md` para subir el nivel. Todo lo demás (la web) ya está listo. 💜
