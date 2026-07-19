/* =========================================================================
   Fátima Rivas — Inmobiliaria Sierra de Madrid
   Almacén de datos compartido (propiedades, zonas y blog)
   -------------------------------------------------------------------------
   Las propiedades se guardan en el navegador (localStorage), de forma que la
   web pública y el gestor (/admin) comparten la misma información. En la
   versión final esto se sustituye por una base de datos; para este sitio
   estático funciona perfectamente y no depende de ningún servidor.
   ========================================================================= */

const SM_STORAGE_KEY = 'fatima_rivas_propiedades_v4';

/* --- Propiedades de ejemplo: 1-2 por pueblo, editables desde /admin -------- */
const SM_SEED = [
  {
    id: 1,
    titulo: 'Chalet luminoso junto a la sierra',
    zona: 'Collado Villalba',
    operacion: 'venta',
    tipo: 'Chalet',
    precio: 385000,
    habitaciones: 4,
    banos: 3,
    metros: 210,
    descripcion: 'Chalet independiente muy luminoso, con parcela ajardinada y vistas a la sierra. Salón con chimenea, cocina amplia y cuatro dormitorios. A pocos minutos de la estación y de todos los servicios.',
    fotos: ['https://framerusercontent.com/images/dKbRFyaTriY51LKHWyoz27yIS7M.jpg?width=1200', 'https://images.unsplash.com/photo-1560449752-8b6023e2ab5a?w=1200&q=80'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 2,
    titulo: 'Piso familiar cerca del centro',
    zona: 'Collado Villalba',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 295000,
    habitaciones: 3,
    banos: 2,
    metros: 98,
    descripcion: 'Piso amplio y bien distribuido a un paso del centro. Tres dormitorios, terraza soleada, garaje y trastero. Edificio cuidado con ascensor, listo para entrar a vivir.',
    fotos: ['https://images.unsplash.com/photo-1743432025864-6fe38295ec3b?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 3,
    titulo: 'Casa tranquila con jardín',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Casa',
    precio: 460000,
    habitaciones: 4,
    banos: 3,
    metros: 245,
    descripcion: 'Casa con mucho carácter en una zona tranquila de Becerril, rodeada de naturaleza. Amplio jardín con árboles, porche para las comidas de verano y chimenea para el invierno.',
    fotos: ['https://framerusercontent.com/images/HJGkPu1Tn0p0X3zkwOXSLKiFXJA.jpg?width=1200', 'https://images.unsplash.com/photo-1645241910657-15bc4c16e0f2?w=1200&q=80'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 4,
    titulo: 'Chalet de piedra con parcela',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Chalet',
    precio: 425000,
    habitaciones: 4,
    banos: 2,
    metros: 230,
    descripcion: 'Chalet de piedra con jardín consolidado y cipreses, en calle tranquila del pueblo. Mucho encanto serrano, garaje y espacio para huerto. Para entrar a vivir o actualizar a tu gusto.',
    fotos: ['https://images.unsplash.com/photo-1775344215207-ed90e37ece72?w=1200&q=80', 'https://images.unsplash.com/photo-1560449752-8b6023e2ab5a?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 5,
    titulo: 'Ático con terraza y vistas a la montaña',
    zona: 'Los Negrales',
    operacion: 'venta',
    tipo: 'Ático',
    precio: 335000,
    habitaciones: 3,
    banos: 2,
    metros: 115,
    descripcion: 'Ático con una terraza espectacular y vistas abiertas a la montaña. Muy luminoso durante todo el día, con tres dormitorios y dos plazas de garaje. Zona residencial muy bien comunicada.',
    fotos: ['https://images.unsplash.com/photo-1776363284806-873eeef565a7?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 6,
    titulo: 'Casa con jardín junto al apeadero',
    zona: 'Los Negrales',
    operacion: 'venta',
    tipo: 'Casa',
    precio: 359000,
    habitaciones: 3,
    banos: 2,
    metros: 150,
    descripcion: 'Casa con jardín soleado a pocos minutos andando del apeadero de Cercanías. Tres dormitorios, cocina reformada y porche orientado al oeste. Ideal para vivir sin depender del coche.',
    fotos: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 7,
    titulo: 'Piso reformado junto a la plaza',
    zona: 'Alpedrete',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 259000,
    habitaciones: 2,
    banos: 1,
    metros: 78,
    descripcion: 'Piso totalmente reformado a dos calles de la plaza de granito. Dos dormitorios, salón con cocina abierta y mucha luz. La estación de Cercanías, a diez minutos a pie.',
    fotos: ['https://images.unsplash.com/photo-1645241910657-15bc4c16e0f2?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 8,
    titulo: 'Chalet independiente con jardín',
    zona: 'Alpedrete',
    operacion: 'venta',
    tipo: 'Chalet',
    precio: 445000,
    habitaciones: 4,
    banos: 3,
    metros: 240,
    descripcion: 'Chalet independiente en parcela llana con jardín maduro y flores. Cuatro dormitorios, dos plantas y garaje doble. Zona residencial consolidada, cerca de colegios.',
    fotos: ['https://images.unsplash.com/photo-1760878816701-cbdec5a74ad0?w=1200&q=80', 'https://images.unsplash.com/photo-1560449752-8b6023e2ab5a?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 9,
    titulo: 'Adosado familiar junto a la dehesa',
    zona: 'Moralzarzal',
    operacion: 'venta',
    tipo: 'Adosado',
    precio: 398000,
    habitaciones: 4,
    banos: 3,
    metros: 190,
    descripcion: 'Adosado en urbanización tranquila junto a la dehesa de Moralzarzal. Cuatro dormitorios, jardín delantero y trasero, y piscina comunitaria. A un paso del polideportivo y los colegios.',
    fotos: ['https://framerusercontent.com/images/dKbRFyaTriY51LKHWyoz27yIS7M.jpg?width=1200', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 10,
    titulo: 'Chalet con parcela grande',
    zona: 'Guadarrama',
    operacion: 'venta',
    tipo: 'Chalet',
    precio: 365000,
    habitaciones: 4,
    banos: 2,
    metros: 220,
    descripcion: 'Chalet con parcela de más de 800 m² en la zona alta de Guadarrama. Casa sólida con porche, chimenea y espacio de sobra para ampliar. Más metros por tu dinero, con la A-6 al lado.',
    fotos: ['https://framerusercontent.com/images/HJGkPu1Tn0p0X3zkwOXSLKiFXJA.jpg?width=1200', 'https://images.unsplash.com/photo-1560449752-8b6023e2ab5a?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 11,
    titulo: 'Chalet alpino con vistas al embalse',
    zona: 'Navacerrada',
    operacion: 'venta',
    tipo: 'Chalet',
    precio: 520000,
    habitaciones: 5,
    banos: 3,
    metros: 280,
    descripcion: 'Chalet de estilo alpino con vistas despejadas al embalse y a la Bola del Mundo. Cinco dormitorios, salón de doble altura con chimenea y jardín con terraza. Una casa para enamorarse de la montaña.',
    fotos: ['https://images.unsplash.com/photo-1676489387866-4f6da0f7b279?w=1200&q=80', 'https://images.unsplash.com/photo-1560449752-8b6023e2ab5a?w=1200&q=80'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 12,
    titulo: 'Casa serrana entre pinares',
    zona: 'Cercedilla',
    operacion: 'venta',
    tipo: 'Casa',
    precio: 340000,
    habitaciones: 3,
    banos: 2,
    metros: 165,
    descripcion: 'Casa serrana de piedra y madera en el entorno del Valle de la Fuenfría. Tres dormitorios, cocina con office y jardín entre pinos. El tren de Cercanías, a un paseo.',
    fotos: ['https://images.unsplash.com/photo-1775344215207-ed90e37ece72?w=1200&q=80', 'https://images.unsplash.com/photo-1645241910657-15bc4c16e0f2?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  }
];

/* --- Propiedades: lectura / escritura ------------------------------------ */
function smGetPropiedades() {
  const raw = localStorage.getItem(SM_STORAGE_KEY);
  if (!raw) { localStorage.setItem(SM_STORAGE_KEY, JSON.stringify(SM_SEED)); return JSON.parse(JSON.stringify(SM_SEED)); }
  try { return JSON.parse(raw); }
  catch (e) { localStorage.setItem(SM_STORAGE_KEY, JSON.stringify(SM_SEED)); return JSON.parse(JSON.stringify(SM_SEED)); }
}
function smSetPropiedades(lista) { localStorage.setItem(SM_STORAGE_KEY, JSON.stringify(lista)); }
function smGetPublicas() { return smGetPropiedades().filter(p => p.visible); }
function smGetPorZona(zona) { return smGetPublicas().filter(p => p.zona === zona); }
function smGetPorId(id) { return smGetPropiedades().find(p => String(p.id) === String(id)); }
function smReset() { localStorage.setItem(SM_STORAGE_KEY, JSON.stringify(SM_SEED)); }
function smPrecio(n) { return new Intl.NumberFormat('es-ES', { style:'currency', currency:'EUR', maximumFractionDigits:0 }).format(n); }
function smSlug(p) { return (p.titulo || '').toString().toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }

/* --- Zonas (para las landing pages y las guías de zona) ------------------- */
const SM_ZONAS = {
  'collado-villalba': {
    nombre: 'Collado Villalba',
    zona: 'Collado Villalba',
    foto: 'https://images.unsplash.com/photo-1582768387518-cbe9dae99156?w=1200&q=80',
    precioMedio: '2.100 – 2.500 €/m²',
    resumen: 'El corazón de la Sierra Oeste: buena conexión con Madrid, servicios completos y la mayor oferta de vivienda de la zona.'
  },
  'becerril-de-la-sierra': {
    nombre: 'Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    foto: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
    precioMedio: '2.300 – 2.900 €/m²',
    resumen: 'Pueblo de montaña tranquilo, muy valorado por sus casas con parcela, el aire limpio y la vida de pueblo a un paso de todo.'
  },
  'los-negrales': {
    nombre: 'Los Negrales',
    zona: 'Los Negrales',
    foto: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    precioMedio: '2.000 – 2.400 €/m²',
    resumen: 'Zona residencial tranquila entre Alpedrete y Collado Villalba, con estación de cercanías propia y acceso rápido a la A-6.'
  }
};

/* --- Blog (artículos para SEO local) ------------------------------------- */
const SM_BLOG = [
  {
    slug: 'impuestos-gastos-comprar-casa-sierra-madrid-2026',
    titulo: 'Impuestos y gastos al comprar casa en la Sierra de Madrid (2026)',
    extracto: 'ITP, IVA, AJD, notaría, registro y gestoría explicados con un ejemplo real de una casa en la Sierra. Con fuentes oficiales.',
    fecha: '2026-07-20', fechaTexto: '20 de julio de 2026',
    categoria: 'Comprar',
    tags: ['Impuestos', 'Comprar', 'ITP', 'Gastos de compra', 'Sierra de Madrid'],
    foto: 'https://images.unsplash.com/photo-1760878816701-cbdec5a74ad0?w=1200&q=80'
  },
  {
    slug: 'cuanto-cuesta-vivir-collado-villalba-2026',
    titulo: 'Cuánto cuesta vivir en Collado Villalba en 2026',
    extracto: 'Vivienda, transporte, colegios y día a día: el desglose real de lo que cuesta vivir en Collado Villalba este año.',
    fecha: '2026-01-14', fechaTexto: '14 de enero de 2026',
    categoria: 'Guía de zona',
    tags: ['Collado Villalba', 'Coste de vida', 'Vivir en la Sierra'],
    foto: 'https://images.unsplash.com/photo-1582768387518-cbe9dae99156?w=1200&q=80'
  },
  {
    slug: 'comprar-casa-sierra-madrid-guia-paso-a-paso',
    titulo: 'Comprar casa en la Sierra de Madrid: guía paso a paso',
    extracto: 'Del ahorro inicial a las llaves: las 8 etapas de comprar una casa en la Sierra, con los gastos y los tiempos reales.',
    fecha: '2026-02-03', fechaTexto: '3 de febrero de 2026',
    categoria: 'Comprar',
    tags: ['Comprar', 'Guía', 'Hipoteca'],
    foto: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80'
  },
  {
    slug: 'cuanto-vale-mi-casa-valoracion-vivienda-sierra',
    titulo: '¿Cuánto vale mi casa? Cómo se valora una vivienda en la Sierra',
    extracto: 'Qué mira de verdad una valoración, por qué el precio del vecino no sirve y cómo poner un precio que venda.',
    fecha: '2026-02-24', fechaTexto: '24 de febrero de 2026',
    categoria: 'Vender',
    tags: ['Vender', 'Valoración', 'Precio'],
    foto: 'https://images.unsplash.com/photo-1775344215207-ed90e37ece72?w=1200&q=80'
  },
  {
    slug: 'becerril-vs-collado-villalba-donde-comprar',
    titulo: 'Becerril de la Sierra vs Collado Villalba: ¿dónde comprar?',
    extracto: 'Precios, ambiente, transporte y servicios de los dos destinos más buscados de la Sierra, comparados sin rodeos.',
    fecha: '2026-03-12', fechaTexto: '12 de marzo de 2026',
    categoria: 'Guía de zona',
    tags: ['Becerril', 'Collado Villalba', 'Comparativa'],
    foto: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80'
  },
  {
    slug: 'documentos-necesarios-para-vender-tu-casa',
    titulo: 'Documentos que necesitas para vender tu casa',
    extracto: 'La lista completa de papeles para vender en Madrid: nota simple, certificado energético, ITE, cédula y más.',
    fecha: '2026-04-07', fechaTexto: '7 de abril de 2026',
    categoria: 'Vender',
    tags: ['Vender', 'Documentos', 'Papeleo'],
    foto: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80'
  },
  {
    slug: 'mejores-pueblos-sierra-madrid-para-vivir-con-ninos',
    titulo: 'Los mejores pueblos de la Sierra de Madrid para vivir con niños',
    extracto: 'Colegios, parques, naturaleza y comunidad: los pueblos de la Sierra donde mejor se cría una familia.',
    fecha: '2026-05-05', fechaTexto: '5 de mayo de 2026',
    categoria: 'Vivir en la Sierra',
    tags: ['Vivir en la Sierra', 'Familias', 'Pueblos'],
    foto: 'https://images.unsplash.com/photo-1714595828847-508c09a78d62?w=1200&q=80'
  }
];
function smBlogPorSlug(slug){ return SM_BLOG.find(a => a.slug === slug); }

/* --- Envío de formularios (Web3Forms) -------------------------------------
   Clave gratuita en https://web3forms.com (se pide con el email y llega al momento).
   Mientras ponga PENDIENTE, los formularios muestran el aviso con el WhatsApp. */
const SM_FORMS_KEY = 'PENDIENTE';

/* --- Datos de contacto (un único sitio para cambiarlos) ------------------- */
const SM_CONTACTO = {
  nombre: 'Fátima Rivas',
  rol: 'Asesora inmobiliaria RE/MAX',
  telefono: '+34 674 13 08 18',
  telefonoLimpio: '34674130818',
  email: 'fatima.rivas@remax.es',
  oficina: 'Calle Sorolla, 20 · Becerril de la Sierra',
  zonas: 'Collado Villalba · Becerril de la Sierra · Los Negrales · Sierra de Madrid',
  horario: 'Lunes a domingo, 9:00–21:00',
  web: 'https://www.inmobiliariasierramadrid.com'
};

/* --- Reseñas reales de Google (ficha: Inmobiliaria Sierra Madrid) --------- */
const SM_GOOGLE_RESENAS_URL = 'https://www.google.com/maps/place/Inmobiliaria+Sierra+Madrid/@40.7029904,-3.999802,17z/data=!4m8!3m7!1s0xd41739e0c6e213b:0xcfdf41d450499581!8m2!3d40.7029904!4d-3.9972271!9m1!1b1!16s%2Fg%2F11y4ntkmzl';
const SM_RESENAS = [
  { n: 'Alberto Saiz', c: 'Hace un mes', t: 'Gestión impecable. Un agradecimiento en especial para Fátima Rivas, que estuvo volcada en todo momento en la operación, siempre tan atenta y tan profesional.' },
  { n: 'Miguel Ángel Muñoz', c: 'Hace 2 meses', t: 'Gestión de venta perfecta, de 10. Fátima ha realizado un trabajo magnífico encargándose de todos los trámites de la compraventa y facilitando todo el proceso hasta la firma de la escritura en notaría. Altamente recomendable.' },
  { n: 'Mercedes Ramírez', c: 'Hace 5 meses', t: 'Excelentes profesionales en asesoramiento y gestión de ventas de viviendas, destacando la amabilidad y eficiencia de Fátima (Remax Villalba). Fantástico trabajo, muy buena calidad, seguimiento y cumplimiento.' },
  { n: 'Asunción Arzola', c: 'Hace 5 meses', t: 'Todo el proceso ha ido sobre ruedas. La agente que nos atendió, Fátima, tiene mucha experiencia, es de trato muy afable y, sobre todo, muy profesional.' },
  { n: 'Alicia Gómez', c: 'Hace 6 meses', t: 'Excelentes profesionales. He realizado una venta de un inmueble y me han facilitado en todo momento todo lo necesario. Con un trato estupendo. Recomiendo a Inmobiliaria Sierra Madrid sin dudarlo.' },
  { n: 'Cristina Traver', c: 'Hace un año', t: 'Quiero agradecer a Fátima Rivas por su profesionalidad y cercanía durante todo el proceso de compra de mi casa en Alpedrete. Desde el primer contacto demostró un conocimiento profundo del mercado.' },
  { n: 'Eva Romero', c: 'Hace un año', t: 'Inmejorable. Fátima Rivas es la mejor profesional que he conocido en el sector. Ha hecho que todo fuera fácil para nosotros. Muy agradecidos por su magnífico trabajo.' },
  { n: 'Pedro Chamizo', c: 'Hace 2 años', t: 'Nuestra experiencia con el servicio profesional de Fátima ha sido excelente. Muy cercana y dispuesta siempre para explicar y ayudar en toda la gestión. Sin duda recomendaría sus servicios.' }
];
