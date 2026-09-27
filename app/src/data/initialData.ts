import rawCatalog from '../data/catalog_items.json';
import type { CatalogItem, ProjectItem, ProjectMetadata } from '../types';

export const INITIAL_CATALOG: CatalogItem[] = rawCatalog as CatalogItem[];

export const DEFAULT_METADATA: ProjectMetadata = {
  sisin: '1005-4984-0000',
  projectName: 'RELEVAMIENTO DE VIVIENDA Y CENTRO CULTURAL',
  localization: 'ARGENTINA',
  distrito: 'DISTRITO 8',
  ciudad: 'EL ALTO',
  departamento: 'LA PAZ',
  provincia: 'MURILLO',
  secretaria: 'SECRETARIA MUNICIPAL DE PLANIFICACION E INFRAESTRUCTURA URBANA',
  direccion: 'DIRECCION DE PROYECTOS MUNICIPALES',
  unidad: 'UNIDAD DE PROYECTOS MUNICIPALES',
  proyectista: 'Ing. Jhony Castillo Villegas',
  areaResponsable: 'AREA ARQUITECTURA',
  plazoEjecucionDias: 65,
  dimensionamientoUnidad: 'M2',
  dimensionamientoCantidad: 254,
  alcance: 'Construcción de un espacio destinado a centro cultural, en su primera fase contemplada la estructura de planta baja y semisótano con muros de contención.',
  compromisosJunta: 'La junta vecinal se hará cargo del recojo de escombros y resguardo de materiales de obra.',
  beneficiario: 'Comité de Vigilancia y Vecinos de la Urbanización'
};

export const INITIAL_PROJECT_ITEMS: ProjectItem[] = [
  {
    id: 'pi-1',
    itemId: 512,
    itemNumber: 1,
    phase: 'OBRAS PRELIMINARES',
    description: 'EXCAVACIÓN C/MAQ (INCLUYE CARG. Y TRANSP. ÁREA DE LA OBRA)',
    unit: 'M3',
    unitPrice: 28.6,
    calculatedQuantity: 120.5,
    daysDuration: 8,
    startDay: 1,
    dimensions: [
      { id: 'd-1', description: 'Zanja cimientos eje A-C', largo: 15, ancho: 1.2, alto: 1.5, area: 18, volumen: 27, parcial: 27 },
      { id: 'd-2', description: 'Semisótano general', largo: 12, ancho: 6.5, alto: 1.2, area: 78, volumen: 93.5, parcial: 93.5 }
    ]
  },
  {
    id: 'pi-2',
    itemId: 1393,
    itemNumber: 2,
    phase: 'OBRAS PRELIMINARES',
    description: 'DESENLOSETADO',
    unit: 'M2',
    unitPrice: 6.44,
    calculatedQuantity: 45.0,
    daysDuration: 4,
    startDay: 2,
    dimensions: [
      { id: 'd-3', description: 'Área de acceso y retiro', largo: 9, ancho: 5, alto: 0, area: 45, volumen: 0, parcial: 45 }
    ]
  },
  {
    id: 'pi-3',
    itemId: 2,
    itemNumber: 3,
    phase: 'INFRAESTRUCTURA',
    description: 'ACERA DE CEMENTO E=10 CM SIN EMPEDRADO',
    unit: 'M2',
    unitPrice: 155.42,
    calculatedQuantity: 38.0,
    daysDuration: 6,
    startDay: 12,
    dimensions: [
      { id: 'd-4', description: 'Acera perimetral frontal', largo: 19, ancho: 2, alto: 0.1, area: 38, volumen: 3.8, parcial: 38 }
    ]
  },
  {
    id: 'pi-4',
    itemId: 450,
    itemNumber: 4,
    phase: 'OBRA FINA',
    description: 'VENTANA DE MADERA ROBLE 2"',
    unit: 'M2',
    unitPrice: 466.07,
    calculatedQuantity: 14.4,
    daysDuration: 7,
    startDay: 30,
    dimensions: [
      { id: 'd-5', description: 'Ventanas V1 Sala Principal (4 pzas)', largo: 2.0, ancho: 1.2, alto: 0, area: 2.4, volumen: 0, parcial: 9.6 },
      { id: 'd-6', description: 'Ventanas V2 Oficinas (4 pzas)', largo: 1.0, ancho: 1.2, alto: 0, area: 1.2, volumen: 0, parcial: 4.8 }
    ]
  },
  {
    id: 'pi-5',
    itemId: 254,
    itemNumber: 5,
    phase: 'OBRA FINA',
    description: 'PINTURA EN INTERIORES LATEX O SIMILARES (DOS MANOS)',
    unit: 'M2',
    unitPrice: 52.27,
    calculatedQuantity: 185.0,
    daysDuration: 10,
    startDay: 42,
    dimensions: [
      { id: 'd-7', description: 'Muros interiores sala y pasillo', largo: 37, ancho: 2.5, alto: 0, area: 92.5, volumen: 0, parcial: 92.5 },
      { id: 'd-8', description: 'Muros interiores oficinas', largo: 37, ancho: 2.5, alto: 0, area: 92.5, volumen: 0, parcial: 92.5 }
    ]
  }
];

export const PHASES_LIST = [
  'OBRAS PRELIMINARES',
  'INFRAESTRUCTURA',
  'SUPERESTRUCTURA',
  'OBRA GRUESA',
  'OBRA FINA',
  'INSTALACION AGUA POTABLE',
  'INSTALACION SANITARIA',
  'INSTALACION ELECTRICA',
  'INSTALACION PLUVIAL',
  'OBRAS COMPLEMENTARIAS'
];
