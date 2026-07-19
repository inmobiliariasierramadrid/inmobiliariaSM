/* =========================================================================
   Fátima Rivas — Inmobiliaria Sierra de Madrid
   Almacén de datos compartido (propiedades, zonas y blog)
   -------------------------------------------------------------------------
   Las propiedades se guardan en el navegador (localStorage), de forma que la
   web pública y el gestor (/admin) comparten la misma información. En la
   versión final esto se sustituye por una base de datos; para este sitio
   estático funciona perfectamente y no depende de ningún servidor.
   ========================================================================= */

const SM_STORAGE_KEY = 'fatima_rivas_propiedades_v6';

/* --- Propiedades reales (catálogo Inmobiliaria Sierra Madrid) --------------
   Importadas de inmobiliariasierramadrid.com. Editables desde /admin.
   Las fotos son de archivo coherentes con cada tipo/zona: se pueden sustituir
   por las reales desde el gestor. Las vendidas salen en el carrusel de /vender. */
const SM_SEED = [
  /* ===== EN VENTA ===== */
  {
    id: 1,
    titulo: 'Unifamiliar en Los Ángeles de San Rafael',
    zona: 'San Rafael',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 349000,
    habitaciones: 4,
    banos: 3,
    metros: 188,
    descripcion: 'Vivienda unifamiliar de 188 m² en la urbanización Los Ángeles de San Rafael, con cuatro dormitorios y tres baños. Entorno tranquilo de montaña, ideal como primera o segunda residencia.',
    fotos: ['https://images.unsplash.com/photo-1760878816701-cbdec5a74ad0?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 2,
    titulo: 'Unifamiliar de lujo en La Serranilla, Guadarrama',
    zona: 'Guadarrama',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 999000,
    habitaciones: 4,
    banos: 5,
    metros: 450,
    descripcion: 'Amplia vivienda unifamiliar de 450 m² en la exclusiva urbanización La Serranilla, en Guadarrama. Cuatro dormitorios, cinco baños y acabados de alta gama en un entorno privilegiado de la sierra.',
    fotos: ['https://framerusercontent.com/images/HJGkPu1Tn0p0X3zkwOXSLKiFXJA.jpg?width=1200', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 3,
    titulo: 'Adosado en Cabo de Trafalgar, Boadilla del Monte',
    zona: 'Boadilla del Monte',
    operacion: 'venta',
    tipo: 'Adosado',
    precio: 1285000,
    habitaciones: 5,
    banos: 4,
    metros: 271,
    descripcion: 'Espectacular adosado de 271 m² en la zona de Cabo de Trafalgar, en Boadilla del Monte. Cinco dormitorios, cuatro baños y una distribución pensada para la vida en familia en una de las mejores zonas del noroeste.',
    fotos: ['https://framerusercontent.com/images/dKbRFyaTriY51LKHWyoz27yIS7M.jpg?width=1200', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 4,
    titulo: 'Unifamiliar en urbanización privada, Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 595000,
    habitaciones: 5,
    banos: 5,
    metros: 326,
    descripcion: 'Unifamiliar de 326 m² en urbanización privada de Becerril de la Sierra. Cinco dormitorios y cinco baños, con zonas comunes y todo el encanto de vivir en plena sierra a un paso de los servicios del pueblo.',
    fotos: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 5,
    titulo: 'Pareado en Moralzarzal',
    zona: 'Moralzarzal',
    operacion: 'venta',
    tipo: 'Pareado',
    precio: 650000,
    habitaciones: 4,
    banos: 3,
    metros: 198,
    descripcion: 'Pareado de 198 m² en Moralzarzal, con cuatro dormitorios y tres baños. Distribución cómoda y luminosa en uno de los pueblos mejor comunicados de la sierra.',
    fotos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 6,
    titulo: 'Unifamiliar con gran parcela en Mataelpino',
    zona: 'Mataelpino',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 480000,
    habitaciones: 3,
    banos: 2,
    metros: 151,
    descripcion: 'Vivienda unifamiliar de 151 m² sobre una parcela de 1.444 m² en Mataelpino. Tres dormitorios, dos baños y muchísimo terreno para disfrutar del entorno natural de El Boalo · Cerceda · Mataelpino.',
    fotos: ['https://images.unsplash.com/photo-1775344215207-ed90e37ece72?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 7,
    titulo: 'Piso en Cerro Grande, Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 355000,
    habitaciones: 3,
    banos: 2,
    metros: 98,
    descripcion: 'Reservada (arras firmadas). Piso de 98 m² en la urbanización Cerro Grande, en Becerril de la Sierra, con tres dormitorios y dos baños. Escríbeme si quieres que te avise de viviendas similares.',
    fotos: ['https://images.unsplash.com/photo-1743432025864-6fe38295ec3b?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 8,
    titulo: 'Adosado en Molino de la Cruz, Los Molinos',
    zona: 'Los Molinos',
    operacion: 'venta',
    tipo: 'Adosado',
    precio: 511000,
    habitaciones: 4,
    banos: 3,
    metros: 211,
    descripcion: 'Adosado de 211 m² en la zona de Molino de la Cruz, en Los Molinos. Cuatro dormitorios, tres baños y ambiente de pueblo serrano con buenas conexiones.',
    fotos: ['https://framerusercontent.com/images/dKbRFyaTriY51LKHWyoz27yIS7M.jpg?width=1200', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },
  {
    id: 9,
    titulo: 'Pareado en Calle Aneto, Los Molinos',
    zona: 'Los Molinos',
    operacion: 'venta',
    tipo: 'Pareado',
    precio: 550000,
    habitaciones: 4,
    banos: 3,
    metros: 206,
    descripcion: 'Pareado de 206 m² en Calle Aneto, Los Molinos. Cuatro dormitorios y tres baños en una zona residencial tranquila y bien situada.',
    fotos: ['https://images.unsplash.com/photo-1760878816701-cbdec5a74ad0?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: false, visible: true
  },

  /* ===== VENDIDAS (salen en el carrusel de /vender) ===== */
  {
    id: 10,
    titulo: 'Gran unifamiliar en Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 650000,
    habitaciones: 8,
    banos: 4,
    metros: 346,
    descripcion: 'Unifamiliar de 346 m² con ocho dormitorios en Becerril de la Sierra. Vendida.',
    fotos: ['https://framerusercontent.com/images/HJGkPu1Tn0p0X3zkwOXSLKiFXJA.jpg?width=1200', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 11,
    titulo: 'Unifamiliar en Serranía de la Paloma, Collado Mediano',
    zona: 'Collado Mediano',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 690000,
    habitaciones: 7,
    banos: 4,
    metros: 0,
    descripcion: 'Unifamiliar en la urbanización Serranía de la Paloma, en Collado Mediano. Siete dormitorios y cuatro baños. Vendida.',
    fotos: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 12,
    titulo: 'Adosado en Moralzarzal',
    zona: 'Moralzarzal',
    operacion: 'venta',
    tipo: 'Adosado',
    precio: 585000,
    habitaciones: 4,
    banos: 3,
    metros: 0,
    descripcion: 'Adosado de cuatro dormitorios y tres baños en Moralzarzal. Vendido.',
    fotos: ['https://framerusercontent.com/images/dKbRFyaTriY51LKHWyoz27yIS7M.jpg?width=1200', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 13,
    titulo: 'Unifamiliar en Mataelpino',
    zona: 'Mataelpino',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 475000,
    habitaciones: 4,
    banos: 2,
    metros: 160,
    descripcion: 'Unifamiliar de 160 m² con cuatro dormitorios en Mataelpino. Vendida.',
    fotos: ['https://images.unsplash.com/photo-1760878816701-cbdec5a74ad0?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 14,
    titulo: 'Unifamiliar en Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 540000,
    habitaciones: 3,
    banos: 3,
    metros: 234,
    descripcion: 'Unifamiliar de 234 m² en Becerril de la Sierra, con tres dormitorios y tres baños. Vendida.',
    fotos: ['https://images.unsplash.com/photo-1775344215207-ed90e37ece72?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 15,
    titulo: 'Piso en Prado Jerez, Navacerrada',
    zona: 'Navacerrada',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 257000,
    habitaciones: 2,
    banos: 1,
    metros: 70,
    descripcion: 'Piso de 70 m² en la urbanización Prado Jerez, en Navacerrada. Vendido.',
    fotos: ['https://images.unsplash.com/photo-1776363284806-873eeef565a7?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 16,
    titulo: 'Piso en Cerro Grande, Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 245000,
    habitaciones: 3,
    banos: 2,
    metros: 117,
    descripcion: 'Piso de 117 m² en la urbanización Cerro Grande, en Becerril de la Sierra. Vendido.',
    fotos: ['https://images.unsplash.com/photo-1743432025864-6fe38295ec3b?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 17,
    titulo: 'Piso en Cerro Grande, Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 0,
    habitaciones: 3,
    banos: 2,
    metros: 117,
    descripcion: 'Piso de 117 m² en la urbanización Cerro Grande, en Becerril de la Sierra. Vendido.',
    fotos: ['https://images.unsplash.com/photo-1645241910657-15bc4c16e0f2?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 18,
    titulo: 'Piso en Isla Lobeira, Collado Villalba',
    zona: 'Collado Villalba',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 198000,
    habitaciones: 1,
    banos: 1,
    metros: 76,
    descripcion: 'Piso de 76 m² en la zona de Isla Lobeira, en Collado Villalba. Vendido.',
    fotos: ['https://images.unsplash.com/photo-1776363284806-873eeef565a7?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 19,
    titulo: 'Piso en San Rafael',
    zona: 'San Rafael',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 0,
    habitaciones: 3,
    banos: 2,
    metros: 81,
    descripcion: 'Piso de 81 m² con tres dormitorios en San Rafael. Vendido.',
    fotos: ['https://images.unsplash.com/photo-1743432025864-6fe38295ec3b?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 20,
    titulo: 'Unifamiliar en Las Zorreras, El Escorial',
    zona: 'El Escorial',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 265000,
    habitaciones: 2,
    banos: 2,
    metros: 139,
    descripcion: 'Unifamiliar de 139 m² en Las Zorreras, El Escorial. Vendida la nuda propiedad.',
    fotos: ['https://images.unsplash.com/photo-1760878816701-cbdec5a74ad0?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 21,
    titulo: 'Chalet independiente en Mataelpino',
    zona: 'Mataelpino',
    operacion: 'venta',
    tipo: 'Chalet',
    precio: 0,
    habitaciones: 4,
    banos: 2,
    metros: 223,
    descripcion: 'Chalet independiente de 223 m² con cuatro dormitorios en Mataelpino. Vendido.',
    fotos: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 22,
    titulo: 'Piso en Moralzarzal',
    zona: 'Moralzarzal',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 270000,
    habitaciones: 3,
    banos: 1,
    metros: 72,
    descripcion: 'Piso de 72 m² con tres dormitorios en Moralzarzal. Vendido.',
    fotos: ['https://images.unsplash.com/photo-1645241910657-15bc4c16e0f2?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    destacado: false, vendido: true, visible: false
  }
];

/* --- Propiedades: lectura / escritura ------------------------------------ */
function smGetPropiedades() {
  const raw = localStorage.getItem(SM_STORAGE_KEY);
  if (!raw) { localStorage.setItem(SM_STORAGE_KEY, JSON.stringify(SM_SEED)); return JSON.parse(JSON.stringify(SM_SEED)); }
  try { return JSON.parse(raw); }
  catch (e) { localStorage.setItem(SM_STORAGE_KEY, JSON.stringify(SM_SEED)); return JSON.parse(JSON.stringify(SM_SEED)); }
}
function smSetPropiedades(lista) { try { localStorage.setItem(SM_STORAGE_KEY, JSON.stringify(lista)); return true; } catch(e) { return false; } }
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
const SM_FORMS_KEY = '040c7bd4-ce87-43ed-8747-9ad13428171b';

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
