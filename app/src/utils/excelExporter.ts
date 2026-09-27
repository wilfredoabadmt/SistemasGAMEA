import * as XLSX from 'xlsx';
import type { ProjectItem, ProjectMetadata } from '../types';

export function exportProjectToExcel(metadata: ProjectMetadata, items: ProjectItem[]) {
  const wb = XLSX.utils.book_new();

  // 1. Hoja DATOS
  const datosRows = [
    ['SISTEMA MUNICIPAL DE PLANIFICACION - GOBIERNO AUTONOMO MUNICIPAL DE EL ALTO'],
    ['SECRETARIA:', metadata.secretaria],
    ['DIRECCION:', metadata.direccion],
    ['UNIDAD:', metadata.unidad],
    ['PROYECTISTA:', metadata.proyectista],
    ['AREA RESPONSABLE:', metadata.areaResponsable],
    [''],
    ['DATOS GENERALES DEL PROYECTO'],
    ['CODIGO SISIN:', metadata.sisin],
    ['NOMBRE DEL PROYECTO:', metadata.projectName],
    ['LOCALIZACION / ZONA:', metadata.localization],
    ['DISTRITO:', metadata.distrito],
    ['CIUDAD:', metadata.ciudad],
    ['PROVINCIA:', metadata.provincia],
    ['DEPARTAMENTO:', metadata.departamento],
    ['PLAZO DE EJECUCION (DIAS CALENDARIO):', metadata.plazoEjecucionDias],
    ['DIMENSIONAMIENTO:', `${metadata.dimensionamientoCantidad} ${metadata.dimensionamientoUnidad}`],
    ['BENEFICIARIO FINAL:', metadata.beneficiario],
    ['ALCANCE:', metadata.alcance],
    ['COMPROMISOS JUNTA VECINAL:', metadata.compromisosJunta]
  ];
  const wsDatos = XLSX.utils.aoa_to_sheet(datosRows);
  XLSX.utils.book_append_sheet(wb, wsDatos, 'DATOS');

  // 2. Hoja B1 (Presupuesto y Volúmenes de Obra)
  const b1Rows: (string | number)[][] = [
    ['PLANILLA OFICIAL DE VOLUMENES DE OBRA - GAMEA'],
    [`PROYECTO: ${metadata.projectName}`],
    [`LOCALIZACION: ${metadata.localization}`, `DISTRITO: ${metadata.distrito}`],
    [''],
    ['N° ITEM', 'DESCRIPCION DEL ITEM', 'UNIDAD', 'CANTIDAD CALCULADA', 'PRECIO UNITARIO (Bs)', 'PRECIO PARCIAL (Bs)', 'FASE']
  ];

  let totalGeneral = 0;
  items.forEach((item, index) => {
    const parcial = item.calculatedQuantity * item.unitPrice;
    totalGeneral += parcial;
    b1Rows.push([
      index + 1,
      item.description,
      item.unit,
      item.calculatedQuantity,
      item.unitPrice,
      parseFloat(parcial.toFixed(2)),
      item.phase
    ]);
  });

  b1Rows.push(['', '', '', '', 'TOTAL PRESUPUESTO (Bs):', parseFloat(totalGeneral.toFixed(2)), '']);

  const wsB1 = XLSX.utils.aoa_to_sheet(b1Rows);
  XLSX.utils.book_append_sheet(wb, wsB1, 'B1');

  // 3. Hoja COMPUTO (Cómputos métricos detallados)
  const computoRows: (string | number)[][] = [
    ['PLANILLA DE COMPUTOS METRICOS GEOMETRICOS - GAMEA'],
    [`PROYECTO: ${metadata.projectName}`],
    [''],
    ['ITEM N°', 'DESCRIPCION ITEM / DETALLE', 'UND', 'LARGO (m)', 'ANCHO (m)', 'ALTO (m)', 'AREA (m2)', 'VOLUMEN (m3)', 'COMPUTO PARCIAL', 'TOTAL ITEM']
  ];

  items.forEach((item, idx) => {
    computoRows.push([
      idx + 1,
      `[${item.phase}] - ${item.description}`,
      item.unit,
      '', '', '', '', '', '',
      item.calculatedQuantity
    ]);

    if (item.dimensions && item.dimensions.length > 0) {
      item.dimensions.forEach((dim) => {
        computoRows.push([
          '',
          `  -> ${dim.description}`,
          item.unit,
          dim.largo,
          dim.ancho,
          dim.alto,
          dim.area,
          dim.volumen,
          dim.parcial,
          ''
        ]);
      });
    }
  });

  const wsComputo = XLSX.utils.aoa_to_sheet(computoRows);
  XLSX.utils.book_append_sheet(wb, wsComputo, 'COMPUTO');

  // Descarga del archivo
  const fileName = `Planilla_${metadata.sisin.replace(/[^a-zA-Z0-9]/g, '_') || 'GAMEA'}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
