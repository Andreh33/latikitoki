/* ===========================================================================
   CATÁLOGO DE LA WEB — selección curada de los productos más vendibles.
   Las fotos reales se añaden después (campo `image`); mientras tanto cada
   producto tiene un `hue` que genera un mosaico holográfico coherente.
   El catálogo completo de 150 productos vive en /docs/CATALOGO-150-PRODUCTOS.md

   Nota de honestidad: `proof` son etiquetas editoriales (tendencia), NO cifras
   de ventas inventadas. `compareAt` es el PVP de mercado de referencia.
   =========================================================================== */

export type Badge =
  | "VIRAL"
  | "TOP VENTAS"
  | "NUEVO"
  | "EDICIÓN LIMITADA"
  | "TRENDING";

export type CategoryKey =
  | "iluminacion"
  | "tech"
  | "hogar"
  | "selfcare"
  | "accesorios";

export interface Product {
  id: string;
  name: string;
  category: CategoryKey;
  price: number;
  compareAt?: number;
  tagline: string;
  badge?: Badge;
  hue: number; // matiz base del mosaico holográfico
  rating: number; // 4.0 - 5.0
  proof: string; // etiqueta editorial honesta (no inventamos ventas)
  featured?: boolean;
  image?: string; // ruta a foto real cuando exista
}

export interface Category {
  key: CategoryKey;
  name: string;
  blurb: string;
  hue: number;
}

export const CATEGORIES: Category[] = [
  { key: "iluminacion", name: "Iluminación", blurb: "Tu cuarto, otra dimensión.", hue: 265 },
  { key: "tech", name: "Tech & Gadgets", blurb: "Lo que no sabías que necesitabas.", hue: 210 },
  { key: "hogar", name: "Hogar Aesthetic", blurb: "Para un feed de revista.", hue: 320 },
  { key: "selfcare", name: "Self-care", blurb: "Glow-up sin salir de casa.", hue: 175 },
  { key: "accesorios", name: "Accesorios", blurb: "El detalle que lo cambia todo.", hue: 290 },
];

export const CATEGORY_MAP: Record<CategoryKey, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
) as Record<CategoryKey, Category>;

export const PRODUCTS: Product[] = [
  // — Iluminación —
  { id: "proyector-galaxia-aurora", name: "Proyector Galaxia Aurora", category: "iluminacion", price: 34.99, compareAt: 59.99, tagline: "Convierte tu techo en una galaxia entera.", badge: "VIRAL", hue: 262, rating: 4.9, proof: "Viral en TikTok", featured: true },
  { id: "astronauta-nebulosa", name: "Astronauta Proyector Nebulosa", category: "iluminacion", price: 39.99, tagline: "El astronauta que flota en tu nebulosa privada.", badge: "TOP VENTAS", hue: 248, rating: 4.8, proof: "Top de la semana", featured: true },
  { id: "tira-led-reactiva", name: "Tira LED RGB Reactiva 10m", category: "iluminacion", price: 24.99, compareAt: 39.99, tagline: "Baila al ritmo de tu música. Literalmente.", badge: "VIRAL", hue: 200, rating: 4.7, proof: "Lo más guardado", featured: true },
  { id: "lampara-luna-levitante", name: "Lámpara Luna Levitante", category: "iluminacion", price: 49.99, tagline: "Una luna real flotando sobre tu mesa.", badge: "EDICIÓN LIMITADA", hue: 280, rating: 4.9, proof: "Edición limitada" },
  { id: "lampara-sunset", name: "Lámpara Atardecer Sunset", category: "iluminacion", price: 18.99, tagline: "El atardecer perfecto para tus fotos, a demanda.", badge: "TRENDING", hue: 330, rating: 4.6, proof: "Tendencia 2026" },
  { id: "pixel-clock", name: "Cubo Pixel Reloj LED", category: "iluminacion", price: 27.99, tagline: "Reloj, clima y pixel art en tu escritorio.", badge: "NUEVO", hue: 215, rating: 4.7, proof: "Recién llegado" },

  // — Tech & Gadgets —
  { id: "mini-impresora-termica", name: "Mini Impresora Térmica", category: "tech", price: 36.99, compareAt: 54.99, tagline: "Imprime memes y fotos sin tinta. Cabe en el bolsillo.", badge: "VIRAL", hue: 258, rating: 4.8, proof: "Viral en TikTok", featured: true },
  { id: "auriculares-open-ear", name: "Auriculares Open-Ear Air", category: "tech", price: 29.99, tagline: "Música y mundo a la vez. El clip que petó.", badge: "TRENDING", hue: 195, rating: 4.6, proof: "Tendencia 2026", featured: true },
  { id: "smart-ring", name: "Anillo Inteligente Smart Ring", category: "tech", price: 54.99, tagline: "Cuenta tu sueño y tus pasos. Sin pantalla, pura magia.", badge: "NUEVO", hue: 238, rating: 4.5, proof: "Recién llegado" },
  { id: "ventilador-cuello", name: "Ventilador de Cuello Bladeless", category: "tech", price: 19.99, tagline: "Aire fresco manos libres. Verano resuelto.", hue: 188, rating: 4.5, proof: "El más buscado" },
  { id: "teclado-mini-pastel", name: "Teclado Mecánico Mini Pastel", category: "tech", price: 44.99, tagline: "Setup de ensueño con un click que da gustito.", badge: "TRENDING", hue: 300, rating: 4.8, proof: "Favorito del mes" },
  { id: "maceta-levitante", name: "Maceta Levitante Flotante", category: "tech", price: 49.99, tagline: "Una planta que flota y gira sobre su base magnética.", badge: "EDICIÓN LIMITADA", hue: 275, rating: 4.7, proof: "Edición limitada" },

  // — Hogar Aesthetic —
  { id: "humidificador-llama", name: "Humidificador Llama Aurora", category: "hogar", price: 26.99, tagline: "Niebla con fuego de mentira. Ambiente cozy al instante.", badge: "VIRAL", hue: 18, rating: 4.7, proof: "Viral en TikTok", featured: true },
  { id: "difusor-volcan", name: "Difusor Niebla Volcán", category: "hogar", price: 22.99, tagline: "Erupción de vapor aromático. Hipnótico.", badge: "TRENDING", hue: 25, rating: 4.6, proof: "Tendencia 2026" },
  { id: "organizador-giratorio", name: "Organizador Maquillaje 360°", category: "hogar", price: 21.99, tagline: "Todo tu maquillaje en una torre que gira.", hue: 315, rating: 4.6, proof: "El más buscado" },
  { id: "espejo-hollywood", name: "Espejo Hollywood LED Táctil", category: "hogar", price: 38.99, compareAt: 59.99, tagline: "Luz de estrella para tu mejor ángulo.", badge: "TOP VENTAS", hue: 295, rating: 4.8, proof: "Top de la semana" },
  { id: "mantita-nube", name: "Mantita Nube Ultrasuave", category: "hogar", price: 27.99, tagline: "Como abrazar una nube. Adiós, frío.", hue: 322, rating: 4.9, proof: "Lo más guardado" },
  { id: "alfombra-margarita", name: "Alfombra Margarita Mullida", category: "hogar", price: 23.99, tagline: "El detalle cottage que tu cuarto pedía.", badge: "TRENDING", hue: 96, rating: 4.5, proof: "Tendencia 2026" },

  // — Self-care —
  { id: "gua-sha-set", name: "Set Gua Sha + Roller Cuarzo", category: "selfcare", price: 15.99, compareAt: 29.99, tagline: "Ritual facial de spa coreano en tu baño.", badge: "VIRAL", hue: 152, rating: 4.8, proof: "Viral en TikTok", featured: true },
  { id: "ice-roller", name: "Rodillo Hielo Facial Ice", category: "selfcare", price: 12.99, tagline: "Desinflama y despierta la cara en 60 segundos.", hue: 188, rating: 4.6, proof: "El más buscado" },
  { id: "mascara-led", name: "Mascarilla LED Skincare", category: "selfcare", price: 64.99, tagline: "Fototerapia de salón. El glow que se nota.", badge: "NUEVO", hue: 268, rating: 4.5, proof: "Recién llegado" },
  { id: "masajeador-cervical", name: "Masajeador Cervical Smart", category: "selfcare", price: 34.99, tagline: "Adiós tensión de cuello a golpe de impulsos.", hue: 205, rating: 4.5, proof: "Favorito del mes" },
  { id: "secador-ionico", name: "Secador Iónico Compacto", category: "selfcare", price: 29.99, tagline: "Pelo de peluquería, plegable para viajar.", badge: "TRENDING", hue: 318, rating: 4.6, proof: "Tendencia 2026" },
  { id: "kit-manicura-gel", name: "Kit Manicura Gel UV", category: "selfcare", price: 32.99, tagline: "Uñas de salón en casa por una fracción del precio.", hue: 305, rating: 4.7, proof: "El más buscado" },

  // — Accesorios —
  { id: "tote-holografico", name: "Bolso Tote Holográfico", category: "accesorios", price: 24.99, tagline: "Cambia de color con la luz. El bolso que todas miran.", badge: "TRENDING", hue: 285, rating: 4.6, proof: "Tendencia 2026", featured: true },
  { id: "set-anillos-acero", name: "Set 6 Anillos Acero Inox", category: "accesorios", price: 13.99, compareAt: 24.99, tagline: "No se oxidan, no manchan. Stack perfecto.", badge: "TOP VENTAS", hue: 230, rating: 4.8, proof: "Top de la semana" },
  { id: "collar-mariposa", name: "Collar Mariposa Cristal", category: "accesorios", price: 16.99, tagline: "La mariposa que brilla distinto en cada foto.", badge: "VIRAL", hue: 300, rating: 4.7, proof: "Viral en TikTok" },
  { id: "gafas-y2k", name: "Gafas Y2K Futuristas", category: "accesorios", price: 17.99, tagline: "Energía 2000 para tu próximo fit.", badge: "TRENDING", hue: 255, rating: 4.4, proof: "Tendencia 2026" },
  { id: "rinonera-cyber", name: "Riñonera Crossbody Cyber", category: "accesorios", price: 21.99, tagline: "Manos libres con actitud. Reflectante de noche.", badge: "NUEVO", hue: 198, rating: 4.5, proof: "Recién llegado" },
  { id: "beanie-aesthetic", name: "Gorro Beanie Aesthetic", category: "accesorios", price: 14.99, tagline: "El gorro que combina con absolutamente todo.", hue: 275, rating: 4.6, proof: "Favorito del mes" },
];

export const FEATURED = PRODUCTS.filter((p) => p.featured);

export function productsByCategory(key: CategoryKey | "all") {
  if (key === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === key);
}
