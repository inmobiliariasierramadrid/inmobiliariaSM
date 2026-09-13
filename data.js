/* =========================================================================
   Fátima Rivas — Inmobiliaria Sierra de Madrid
   Almacén de datos compartido (propiedades, zonas y blog)
   -------------------------------------------------------------------------
   Las propiedades se guardan en el navegador (localStorage), de forma que la
   web pública y el gestor (/admin) comparten la misma información. En la
   versión final esto se sustituye por una base de datos; para este sitio
   estático funciona perfectamente y no depende de ningún servidor.
   ========================================================================= */

const SM_STORAGE_KEY = 'fatima_rivas_propiedades_v7';

/* --- Propiedades reales (catálogo Inmobiliaria Sierra Madrid) --------------
   Importadas de inmobiliariasierramadrid.com el 13/09/2026: 21 viviendas
   (8 en venta + 13 vendidas), con las fotos reales descargadas a
   assets/img/propiedades/. Editables desde /admin.
   Las vendidas salen en el carrusel de /vender. */
const SM_SEED = [
  /* ===== EN VENTA ===== */
  {
    id: 1,
    titulo: 'Adosado en Mataelpino',
    zona: 'Mataelpino',
    operacion: 'venta',
    tipo: 'Adosado',
    precio: 430000,
    habitaciones: 4,
    banos: 3,
    metros: 188,
    descripcion: 'Nueva captación. Adosado de 188 m² en Mataelpino, con cuatro dormitorios y tres baños. Vivienda amplia en pleno entorno natural de El Boalo · Cerceda · Mataelpino, a los pies de La Maliciosa. Escríbeme y concertamos una visita.',
    fotos: ['assets/img/propiedades/01-adosado-mataelpino-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/112384347/',
    destacado: true, vendido: false, visible: true
  },
  {
    id: 2,
    titulo: 'Piso reformado en Los Arroyos, El Escorial',
    zona: 'El Escorial',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 325000,
    habitaciones: 3,
    banos: 1,
    metros: 90,
    descripcion: 'Nueva captación. Vivienda de 90 m² útiles (128 construidos) totalmente reformada, en la calle principal de Navalquejido, Los Arroyos (El Escorial). Reforma integral de alta calidad: pintura lisa, suelos laminados, carpintería interior moderna y cocina y baño rehechos por completo. Ventanas de PVC oscilobatientes con gran aislamiento térmico y acústico, además de mejoras de aislamiento en paredes y tejado. Salón-comedor con chimenea de casete y bomba de aire frío-calor, orientación oeste y salida directa a la terraza. Cocina ampliada al incorporar la terraza-tendedero, con zona de office. Tres dormitorios amplios con armarios empotrados y baño completo reformado con ventana exterior a zonas ajardinadas. Incluye trastero privado de 5 m² y plaza de garaje en el propio edificio. A escasos metros del Mercadona y a menos de 500 m de la estación de Cercanías de Las Zorreras.',
    fotos: ['assets/img/propiedades/02-piso-los-arroyos-el-escorial-1.jpg', 'assets/img/propiedades/02-piso-los-arroyos-el-escorial-2.jpg', 'assets/img/propiedades/02-piso-los-arroyos-el-escorial-plano.jpg'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 3,
    titulo: 'Piso en Cerro Grande, Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 360000,
    habitaciones: 3,
    banos: 2,
    metros: 98,
    descripcion: 'Nueva captación. Vivienda de 98 m² útiles (117 construidos) en la urbanización Cerro Grande de Becerril de la Sierra, con vistas únicas a Guadarrama, Collado Mediano, Navacerrada, el Cerro del Castillo, el Monte del Telégrafo, la Bola del Mundo, La Maliciosa y Siete Picos. Desde la terraza de 18 m², conectada con el salón (20 m²) y el dormitorio principal, se disfruta de todo el horizonte de la sierra. Tres dormitorios con armarios empotrados, dos baños completos (uno de ellos en suite), cocina amplia con terraza-tendedero incorporada y salón con chimenea. Urbanización tranquila y bien comunicada, a 2 km del casco urbano, con piscina de 25 metros y piscina infantil, cafetería, zonas ajardinadas, campo multideportivo de baloncesto y futbito, pistas de tenis y pádel y parques infantiles. A 130 metros del autobús 691 a Moncloa y a los hospitales de Villalba y El Escorial.',
    fotos: ['assets/img/propiedades/03-piso-cerro-grande-becerril-1.jpg', 'assets/img/propiedades/03-piso-cerro-grande-becerril-2.jpg', 'assets/img/propiedades/03-piso-cerro-grande-becerril-plano.jpg'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 4,
    titulo: 'Adosado en urbanización privada, Moralzarzal',
    zona: 'Moralzarzal',
    operacion: 'venta',
    tipo: 'Adosado',
    precio: 625000,
    habitaciones: 3,
    banos: 3,
    metros: 163,
    descripcion: 'Arras firmadas. Adosado de 163 m² en urbanización privada de Moralzarzal, con tres dormitorios, tres baños y calificación energética A. Escríbeme si quieres que te avise de viviendas similares en la zona.',
    fotos: ['assets/img/propiedades/04-adosado-urb-privada-moralzarzal-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/112026894/',
    destacado: true, vendido: false, visible: true
  },
  {
    id: 5,
    titulo: 'Unifamiliar en Los Ángeles de San Rafael',
    zona: 'San Rafael',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 349000,
    habitaciones: 4,
    banos: 3,
    metros: 188,
    descripcion: 'Vivienda unifamiliar de 188 m² en la urbanización Los Ángeles de San Rafael, con cuatro dormitorios y tres baños. Entorno tranquilo de montaña, ideal como primera o segunda residencia.',
    fotos: ['assets/img/propiedades/05-unifamiliar-los-angeles-san-rafael-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/111383468/',
    destacado: false, vendido: false, visible: true
  },
  {
    id: 6,
    titulo: 'Villa de lujo en La Serranilla, Guadarrama',
    zona: 'Guadarrama',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 999000,
    habitaciones: 4,
    banos: 5,
    metros: 450,
    descripcion: 'Villa de lujo de 450 m² construidos sobre una parcela de 1.000 m², en la urbanización privada La Serranilla, entre Guadarrama y Los Molinos. Jardín consolidado con césped, riego automático y piscina independiente. Se distribuye en tres plantas: sótano con garaje para dos coches con punto de carga eléctrica, lavandería, trastero, sala de máquinas y dormitorio con baño; planta principal con amplio salón-comedor de grandes ventanales y chimenea, salida a terraza de 47 m² con vistas a la Sierra, cocina de diseño equipada con acceso a la piscina, aseo y dormitorio en suite; y planta superior con dos dormitorios, zona de despacho y dos baños completos. Destaca por su eficiencia energética: aerotermia, 16 placas solares (8,6 kWp), domótica en persianas e iluminación eficiente en toda la vivienda. Construida en 2008, con calificación energética A.',
    fotos: ['assets/img/propiedades/06-unifamiliar-la-serranilla-guadarrama-1.jpg', 'assets/img/propiedades/06-unifamiliar-la-serranilla-guadarrama-2.jpg'],
    destacado: true, vendido: false, visible: true
  },
  {
    id: 7,
    titulo: 'Casa de pueblo en el casco urbano de Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Casa de pueblo',
    precio: 445900,
    habitaciones: 1,
    banos: 1,
    metros: 54,
    descripcion: 'Nueva captación. Casa de pueblo de 54 m² en pleno casco urbano de Becerril de la Sierra, con un dormitorio y un baño. Todo el encanto de la construcción tradicional serrana a un paso de los servicios del pueblo.',
    fotos: ['assets/img/propiedades/07-casa-pueblo-becerril-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/112017724/',
    destacado: true, vendido: false, visible: true
  },
  {
    id: 8,
    titulo: 'Pareado en Moralzarzal',
    zona: 'Moralzarzal',
    operacion: 'venta',
    tipo: 'Pareado',
    precio: 650000,
    habitaciones: 4,
    banos: 3,
    metros: 198,
    descripcion: 'Pareado de 198 m² en Moralzarzal, con cuatro dormitorios y tres baños. Distribución cómoda y luminosa en uno de los pueblos mejor comunicados de la sierra.',
    fotos: ['assets/img/propiedades/08-pareado-moralzarzal-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/111057691/',
    destacado: false, vendido: false, visible: true
  },

  /* ===== YA VENDIDAS (no salen en Comprar; alimentan el carrusel de Vender) ===== */
  {
    id: 9,
    titulo: 'Gran unifamiliar en Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 650000,
    habitaciones: 8,
    banos: 4,
    metros: 346,
    descripcion: 'Unifamiliar de 346 m² en Becerril de la Sierra, con ocho dormitorios y cuatro baños. Vendida.',
    fotos: ['assets/img/propiedades/09-unifamiliar-becerril-346-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/109302231/',
    destacado: false, vendido: true, visible: false
  },
  {
    id: 10,
    titulo: 'Piso en Cerro Grande, Becerril de la Sierra',
    zona: 'Becerril de la Sierra',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 355000,
    habitaciones: 3,
    banos: 2,
    metros: 98,
    descripcion: 'Piso de 98 m² en la urbanización Cerro Grande de Becerril de la Sierra, con tres dormitorios y dos baños. Vendida.',
    fotos: ['assets/img/propiedades/10-piso-cerro-grande-355-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/111211220/',
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
    descripcion: 'Unifamiliar en la urbanización Serranía de la Paloma, en Collado Mediano, con siete dormitorios y cuatro baños. Vendida.',
    fotos: ['assets/img/propiedades/11-unifamiliar-serrania-paloma-collado-mediano-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/109948200/',
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
    descripcion: 'Adosado en Moralzarzal, con cuatro dormitorios y tres baños. Vendida.',
    fotos: ['assets/img/propiedades/12-adosado-moralzarzal-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/110509743/',
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
    descripcion: 'Unifamiliar de 160 m² en Mataelpino, con cuatro dormitorios y dos baños. Vendida.',
    fotos: ['assets/img/propiedades/13-unifamiliar-mataelpino-160-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/110768088/',
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
    fotos: ['assets/img/propiedades/14-unifamiliar-becerril-234-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/109617589/',
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
    descripcion: 'Piso de 70 m² en la urbanización Prado Jerez, en Navacerrada, con dos dormitorios y un baño. Vendida.',
    fotos: ['assets/img/propiedades/15-piso-prado-jerez-navacerrada-1.jpg'],
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
    descripcion: 'Piso de 117 m² en la urbanización Cerro Grande de Becerril de la Sierra, con tres dormitorios y dos baños. Vendida.',
    fotos: ['assets/img/propiedades/16-piso-cerro-grande-245-1.jpg'],
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
    descripcion: 'Piso de 117 m² en la urbanización Cerro Grande de Becerril de la Sierra, con tres dormitorios y dos baños. Vendida.',
    fotos: ['assets/img/propiedades/17-piso-cerro-grande-117-1.jpg'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 18,
    titulo: 'Piso en San Rafael',
    zona: 'San Rafael',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 0,
    habitaciones: 3,
    banos: 2,
    metros: 81,
    descripcion: 'Piso de 81 m² en San Rafael, con tres dormitorios y dos baños. Vendida.',
    fotos: ['assets/img/propiedades/18-piso-san-rafael-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/109491204/',
    destacado: false, vendido: true, visible: false
  },
  {
    id: 19,
    titulo: 'Unifamiliar en Las Zorreras, El Escorial',
    zona: 'El Escorial',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 265000,
    habitaciones: 2,
    banos: 2,
    metros: 139,
    descripcion: 'Unifamiliar de 139 m² en Las Zorreras, El Escorial, con dos dormitorios y dos baños. Vendida la nuda propiedad.',
    fotos: ['assets/img/propiedades/19-unifamiliar-las-zorreras-el-escorial-1.jpg'],
    destacado: false, vendido: true, visible: false
  },
  {
    id: 20,
    titulo: 'Chalet independiente en Mataelpino',
    zona: 'Mataelpino',
    operacion: 'venta',
    tipo: 'Unifamiliar',
    precio: 0,
    habitaciones: 4,
    banos: 2,
    metros: 223,
    descripcion: 'Chalet independiente de 223 m² en Mataelpino, con cuatro dormitorios y dos baños. Vendida.',
    fotos: ['assets/img/propiedades/20-independiente-mataelpino-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/109383779/',
    destacado: false, vendido: true, visible: false
  },
  {
    id: 21,
    titulo: 'Piso en Moralzarzal',
    zona: 'Moralzarzal',
    operacion: 'venta',
    tipo: 'Piso',
    precio: 270000,
    habitaciones: 3,
    banos: 1,
    metros: 72,
    descripcion: 'Piso de 72 m² en Moralzarzal, con tres dormitorios y un baño. Vendida.',
    fotos: ['assets/img/propiedades/21-piso-moralzarzal-1.jpg'],
    idealista: 'https://www.idealista.com/inmueble/108789694/',
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
