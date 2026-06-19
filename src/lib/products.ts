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
  bestSeller?: boolean; // "producto del mes" destacado en la home
  image?: string; // ruta a foto real cuando exista
  seo?: string; // descripción SEO (meta) para buscadores
}

export interface Category {
  key: CategoryKey;
  name: string;
  blurb: string;
  hue: number;
  image: string;
}

export const CATEGORIES: Category[] = [
  { key: "iluminacion", name: "Iluminación", blurb: "Tu cuarto, otra dimensión.", hue: 265, image: "/productos/proyector-galaxia-aurora.jpg" },
  { key: "tech", name: "Tech & Gadgets", blurb: "Lo que no sabías que necesitabas.", hue: 210, image: "/productos/pixel-clock.jpg" },
  { key: "hogar", name: "Hogar Aesthetic", blurb: "Para un feed de revista.", hue: 320, image: "/productos/espejo-hollywood.jpg" },
  { key: "selfcare", name: "Self-care", blurb: "Glow-up sin salir de casa.", hue: 175, image: "/productos/gua-sha-set.jpg" },
  { key: "accesorios", name: "Accesorios", blurb: "El detalle que lo cambia todo.", hue: 290, image: "/productos/tote-holografico.jpg" },
];

export const CATEGORY_MAP: Record<CategoryKey, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c]),
) as Record<CategoryKey, Category>;

const RAW_PRODUCTS: Product[] = [
  // — Iluminación —
  { id: "proyector-galaxia-aurora", name: "Proyector Galaxia Aurora", category: "iluminacion", price: 34.99, compareAt: 59.99, tagline: "Convierte tu techo en una galaxia entera.", badge: "VIRAL", hue: 262, rating: 4.9, proof: "Viral en TikTok", featured: true, bestSeller: true },
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

  // — Catálogo ampliado · Tanda 1 (Alibaba) —
  { id: "soporte-monitor-cajon-hub", name: "Soporte Monitor con Cajón y Hub USB", category: "tech", price: 34.99, badge: "VIRAL", hue: 210, rating: 4.7, proof: "Viral en TikTok", tagline: "Eleva tu pantalla y ordena el caos de cables en un solo gesto.", seo: "Elevador de monitor con hub USB y cajón organizador para escritorio gaming aesthetic: ordena cables y eleva la pantalla. Ideal para setup minimalista, estudio y streaming." },
  { id: "alfombrilla-xxl-escritorio-pastel", name: "Alfombrilla XXL Escritorio Pastel", category: "tech", price: 17.99, badge: "TRENDING", hue: 300, rating: 4.6, proof: "Tendencia 2026", tagline: "El lienzo pastel que convierte tu mesa en un setup de revista.", seo: "Alfombrilla de escritorio XXL gaming en tonos pastel: base aesthetic para teclado y ratón, antideslizante y lavable. Personalizable con tu marca." },
  { id: "soporte-auriculares-rgb-hub", name: "Soporte Auriculares RGB con Hub USB", category: "tech", price: 27.99, hue: 195, rating: 4.5, proof: "Recién llegado", tagline: "Cuelga tus cascos con glow RGB y libera tu escritorio.", seo: "Soporte para cascos gaming con luz RGB y hub USB: libera espacio y da glow a tu setup. Perfecto para gamers, streamers y desk aesthetic." },
  { id: "reposamunecas-teclado-raton-gel", name: "Reposamuñecas Teclado/Ratón Gel Pastel", category: "tech", price: 16.99, hue: 320, rating: 4.6, proof: "El más buscado", tagline: "Comodidad pastel para horas de juego sin castigar tus muñecas.", seo: "Set reposamuñecas de gel para teclado y ratón en colores pastel: comodidad ergonómica para largas sesiones de gaming, estudio o teletrabajo." },
  { id: "bandeja-bajo-escritorio-cables", name: "Bandeja Bajo-Escritorio para Cables", category: "tech", price: 18.99, hue: 220, rating: 4.5, proof: "Lo más guardado", tagline: "Esconde regletas y cables: el antes/después que para el scroll.", seo: "Bandeja de gestión de cables bajo escritorio: oculta regletas y cables para un setup limpio y aesthetic. Montaje sin taladrar." },
  { id: "cojin-lumbar-reposapies", name: "Cojín Lumbar + Reposapiés Ergonómico", category: "hogar", price: 32.99, hue: 200, rating: 4.6, proof: "Favorito del mes", tagline: "Tu glow up de postura para gaming, estudio y home office.", seo: "Kit cojín lumbar y reposapiés ergonómico para silla de escritorio: mejora la postura en gaming, estudio y home office. Espuma viscoelástica y funda lavable." },
  { id: "lampara-escritorio-plegable", name: "Lámpara de Escritorio Plegable 3 en 1", category: "iluminacion", price: 36.99, badge: "NUEVO", hue: 215, rating: 4.7, proof: "Recién llegado", tagline: "Luz de estudio, reloj y carga inalámbrica: 3 en 1 que cabe en cualquier mesa.", seo: "Flexo LED plegable con reloj, carga inalámbrica y regulador táctil: luz de estudio aesthetic 3 en 1 para tu desk setup. Multifunción y ahorro de espacio." },
  { id: "kit-luz-ambiental-coche-rgb", name: "Kit Luz Ambiental Coche RGB con App", category: "iluminacion", price: 32.99, badge: "VIRAL", hue: 280, rating: 4.6, proof: "Viral en TikTok", tagline: "Convierte tu coche en modo aesthetic que cambia al ritmo de la música.", seo: "Kit de luz ambiental para coche RGB con control por app y música: transforma el interior en modo aesthetic con fibra óptica. Instalación adhesiva sin herramientas." },
  { id: "techo-estrellado-coche-led", name: "Techo Estrellado Coche LED", category: "iluminacion", price: 26.99, badge: "TRENDING", hue: 248, rating: 4.7, proof: "Tendencia 2026", tagline: "Un cielo de estrellas en tu techo para los viajes nocturnos.", seo: "Luz de techo estrellado para coche LED USB: convierte el techo en un cielo de estrellas para viajes nocturnos aesthetic. Efecto galaxia portátil y fácil de pegar." },
  { id: "tapacubos-led-flotantes", name: "Tapacubos LED Flotantes (set 4)", category: "accesorios", price: 39.99, badge: "EDICIÓN LIMITADA", hue: 255, rating: 4.5, proof: "Edición limitada", tagline: "El logo que nunca gira: magia visual para tus llantas.", seo: "Set de 4 tapacubos LED flotantes que se mantienen rectos en movimiento: dan un look premium y aesthetic a las llantas. Carga magnética e impermeables." },
  { id: "difusor-aromas-coche", name: "Difusor de Aromas Coche Aesthetic", category: "hogar", price: 12.99, hue: 25, rating: 4.5, proof: "El más buscado", tagline: "El detalle mono que perfuma tu coche con estilo.", seo: "Difusor de aromas para coche con clip de rejilla y diseño aesthetic: ambienta tu coche con estilo y recargas tú el perfume. Detalle mono que combina con tu deco." },
  { id: "set-accesorios-coche-aesthetic", name: "Set Accesorios Coche Aesthetic", category: "accesorios", price: 24.99, badge: "TRENDING", hue: 300, rating: 4.6, proof: "Tendencia 2026", tagline: "El girly car setup que arrasa en TikTok, en un solo pack.", seo: "Set de accesorios de coche aesthetic: fundas de cinturón, colgante y detalles cute para personalizar tu coche con vibe TikTok. Pack regalo con tu marca." },
  { id: "set-collar-bandana-lazo", name: "Set Collar + Bandana + Lazo a Juego", category: "accesorios", price: 18.99, hue: 290, rating: 4.6, proof: "Favorito del mes", tagline: "Looks coordinados pet & me para las fotos más adorables.", seo: "Set collar, bandana y lazo a juego para perro o gato en tonos pastel: looks coordinados pet & me para fotos aesthetic. Ajustable, suave y resistente." },
  { id: "cama-sofa-mini-mascota", name: "Cama Sofá Mini para Mascota", category: "hogar", price: 49.99, badge: "TOP VENTAS", hue: 322, rating: 4.8, proof: "Top de la semana", tagline: "El mini sofá que parece mueble humano y enamora a tu mascota.", seo: "Cama-sofá mini para gato o perro con estilo de mueble real: deco de habitación que es también cama cómoda para tu mascota. Tendencia pet furniture aesthetic." },
  { id: "alfombrilla-refrescante-gel-mascotas", name: "Alfombrilla Refrescante de Gel para Mascotas", category: "hogar", price: 24.99, hue: 188, rating: 4.5, proof: "Recién llegado", tagline: "Alivia el calor del verano sin electricidad ni agua.", seo: "Alfombrilla refrescante de gel para perros y gatos: alivia el calor del verano sin electricidad ni agua, se autorrecarga. Lavable y antideslizante." },
  { id: "comedero-antiatragantamiento", name: "Comedero Antiatragantamiento Slow Feeder", category: "hogar", price: 15.99, hue: 152, rating: 4.6, proof: "Lo más guardado", tagline: "Ralentiza la comida y cuida la digestión de tu peludo.", seo: "Comedero antiatragantamiento (slow feeder) para perros y gatos: ralentiza la comida, mejora la digestión y reduce el estrés. Diseño laberinto y colores pastel." },
  { id: "cepillo-deshedding", name: "Cepillo Quita-Pelo Deshedding Pro", category: "hogar", price: 16.99, badge: "VIRAL", hue: 205, rating: 4.7, proof: "Viral en TikTok", tagline: "Adiós a la muda: resultados satisfying al instante.", seo: "Cepillo deshedding profesional para perros y gatos: elimina el pelo muerto y reduce la muda con un botón de auto-limpieza. Resultados visibles al instante." },
  { id: "botella-agua-portatil-mascota", name: "Botella de Agua Portátil 2 en 1 para Paseo", category: "accesorios", price: 18.99, hue: 195, rating: 4.6, proof: "El más buscado", tagline: "Bebedero de paseo sin goteo: imprescindible para salidas.", seo: "Botella de agua portátil 2 en 1 para perros: bebedero de paseo con dispensador de un toque, sin goteo. Imprescindible aesthetic para salidas y viajes." },
  { id: "fuente-agua-silenciosa-gatos", name: "Fuente de Agua Silenciosa para Gatos", category: "hogar", price: 34.99, badge: "NUEVO", hue: 190, rating: 4.6, proof: "Recién llegado", tagline: "Agua fresca en circulación que anima a tu gato a beber más.", seo: "Fuente de agua silenciosa para gatos con luz LED y filtro: agua fresca en circulación que anima a tu gato a beber más. Diseño minimalista aesthetic." },
  { id: "spray-dispensador-aceite", name: "Spray Dispensador de Aceite 2 en 1", category: "hogar", price: 15.99, badge: "VIRAL", hue: 96, rating: 4.7, proof: "Viral en TikTok", tagline: "El gadget #1 de la freidora de aire: rocía el aceite justo.", seo: "Spray dispensador de aceite 2 en 1 de cristal: rocía o vierte el aceite justo para freidora de aire, ensaladas y plancha. Cocina más sana y aesthetic." },
  { id: "cubo-basura-sensor", name: "Cubo de Basura Cocina con Sensor", category: "hogar", price: 59.99, hue: 215, rating: 4.6, proof: "Favorito del mes", tagline: "La tapa que se abre sola: tu cocina en modo futurista.", seo: "Cubo de basura inteligente con sensor sin contacto para cocina: se abre solo al acercar la mano, higiénico y aesthetic. Acero mate y cierre suave." },
  { id: "hervidor-huevos-electrico", name: "Hervidor Rápido de Huevos Eléctrico", category: "hogar", price: 27.99, hue: 45, rating: 4.5, proof: "El más buscado", tagline: "Huevos perfectos en minutos y apagado automático.", seo: "Hervidor rápido de huevos eléctrico para 7 unidades: huevos perfectos (duros, mollet, pochados) en minutos con apagado automático. Compacto y aesthetic." },
  { id: "cortador-uvas-tomates", name: "Cortador de Uvas y Tomates Cherry", category: "hogar", price: 11.99, hue: 340, rating: 4.5, proof: "Lo más guardado", tagline: "Parte 20 uvas de una pasada: snack prep satisfying y seguro.", seo: "Cortador rápido de uvas y tomates cherry: parte en mitades en un gesto, ideal para meriendas infantiles y bowls aesthetic. Seguro y fácil de limpiar." },
  { id: "maquina-helado-enrollado", name: "Máquina de Helado Enrollado Casero", category: "hogar", price: 64.99, badge: "EDICIÓN LIMITADA", hue: 320, rating: 4.6, proof: "Edición limitada", tagline: "Haz los ice cream rolls virales de street food en tu cocina.", seo: "Máquina de helado enrollado casero con placa fría: crea ice cream rolls como en los vídeos virales de street food. Postres aesthetic y diversión en familia." },
];

// Cada producto usa su foto real en /productos/{id}.jpg y una descripción SEO.
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  image: p.image ?? `/productos/${p.id}.jpg`,
  seo:
    p.seo ??
    `${p.name}: ${p.tagline} ${CATEGORY_MAP[p.category].name} viral y aesthetic de La TikiToki, con envío rápido a toda España. Lo viral, antes que nadie.`,
}));

export const FEATURED = PRODUCTS.filter((p) => p.featured);

export const BEST_SELLER = PRODUCTS.find((p) => p.bestSeller) ?? PRODUCTS[0];

export function productsByCategory(key: CategoryKey | "all") {
  if (key === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === key);
}
