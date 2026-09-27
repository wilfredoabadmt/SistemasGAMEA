export interface CatalogItem {
  id: number;
  area: string;
  description: string;
  unit: string;
  unitPrice: number;
  specFile?: string;
}

export interface DimensionEntry {
  id: string;
  description: string;
  largo: number;
  ancho: number;
  alto: number;
  area: number;
  volumen: number;
  parcial: number;
}

export interface ProjectItem {
  id: string; // unique row id
  itemId: number; // reference to CatalogItem
  itemNumber: number; // sequential item in project
  phase: string; // e.g. "OBRAS PRELIMINARES", "INFRAESTRUCTURA", "OBRA GRUESA", "INSTALACIONES"
  description: string;
  unit: string;
  unitPrice: number;
  calculatedQuantity: number;
  dimensions: DimensionEntry[];
  daysDuration?: number;
  startDay?: number;
}

export interface ProjectMetadata {
  sisin: string;
  projectName: string;
  localization: string;
  distrito: string;
  ciudad: string;
  departamento: string;
  provincia: string;
  secretaria: string;
  direccion: string;
  unidad: string;
  proyectista: string;
  areaResponsable: string;
  plazoEjecucionDias: number;
  dimensionamientoUnidad: string;
  dimensionamientoCantidad: number;
  alcance: string;
  compromisosJunta: string;
  beneficiario: string;
}
