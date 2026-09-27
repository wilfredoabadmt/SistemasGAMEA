import React, { useMemo } from 'react';
import { DollarSign, Trash2, Download } from 'lucide-react';
import type { ProjectItem, ProjectMetadata } from '../../types';
import { formatCurrency, numberToBolivianosLiteral } from '../../utils/numberToLiteral';
import { exportProjectToExcel } from '../../utils/excelExporter';

interface Props {
  metadata: ProjectMetadata;
  projectItems: ProjectItem[];
  onUpdateItems: (items: ProjectItem[]) => void;
  onRemoveItem: (itemRowId: string) => void;
}

export const BudgetModule: React.FC<Props> = ({
  metadata,
  projectItems,
  onUpdateItems,
  onRemoveItem
}) => {
  const totalPresupuesto = useMemo(() => {
    return projectItems.reduce((acc, item) => acc + (item.calculatedQuantity * item.unitPrice), 0);
  }, [projectItems]);

  const literalTotal = useMemo(() => {
    return numberToBolivianosLiteral(totalPresupuesto);
  }, [totalPresupuesto]);

  // Agrupación por fases
  const itemsByPhase = useMemo(() => {
    const groups: { [phase: string]: ProjectItem[] } = {};
    projectItems.forEach(item => {
      const p = item.phase || 'SIN FASE';
      if (!groups[p]) groups[p] = [];
      groups[p].push(item);
    });
    return groups;
  }, [projectItems]);

  const handleUpdateQuantity = (id: string, qty: number) => {
    const updated = projectItems.map(item => {
      if (item.id === id) {
        return { ...item, calculatedQuantity: qty };
      }
      return item;
    });
    onUpdateItems(updated);
  };

  const handleUpdatePrice = (id: string, price: number) => {
    const updated = projectItems.map(item => {
      if (item.id === id) {
        return { ...item, unitPrice: price };
      }
      return item;
    });
    onUpdateItems(updated);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 backdrop-blur shadow-2xl space-y-6">
      {/* Top Banner de Resumen Económico */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Presupuesto y Volúmenes de Obra (Hoja B1)</h2>
              <p className="text-sm text-slate-400">
                Planilla oficial de presupuesto de construcción aprobada por el GAMEA
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={() => exportProjectToExcel(metadata, projectItems)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Exportar Excel Oficial (.xlsx)
          </button>
        </div>
      </div>

      {/* KPI Cards de Monto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-5 rounded-xl border border-slate-800 shadow-md">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Costo Total Referencial
          </span>
          <div className="text-2xl lg:text-3xl font-black font-mono text-emerald-400 mt-2">
            Bs. {formatCurrency(totalPresupuesto)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 line-clamp-1 italic font-mono">
            {literalTotal}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-5 rounded-xl border border-slate-800 shadow-md">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Ítems de Construcción
          </span>
          <div className="text-2xl lg:text-3xl font-black font-mono text-blue-400 mt-2">
            {projectItems.length} Ítems
          </div>
          <div className="text-xs text-slate-400 mt-1">
            En {Object.keys(itemsByPhase).length} Fases Constructivas
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-5 rounded-xl border border-slate-800 shadow-md">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Dimensionamiento Total
          </span>
          <div className="text-2xl lg:text-3xl font-black font-mono text-amber-400 mt-2">
            {metadata.dimensionamientoCantidad} {metadata.dimensionamientoUnidad}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Plazo contractual: {metadata.plazoEjecucionDias} Días Calendario
          </div>
        </div>
      </div>

      {/* Tabla Oficial de Presupuesto B1 */}
      <div className="border border-slate-800/80 rounded-lg overflow-hidden bg-slate-950/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-900 sticky top-0 z-10 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3 w-16 text-center">N°</th>
                <th className="py-3 px-4">Descripción del Ítem</th>
                <th className="py-3 px-3 w-20 text-center">Und.</th>
                <th className="py-3 px-4 w-36 text-right">Cant. Calculada</th>
                <th className="py-3 px-4 w-36 text-right">P. Unitario (Bs)</th>
                <th className="py-3 px-4 w-40 text-right">Total Parcial (Bs)</th>
                <th className="py-3 px-3 w-14 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-mono text-xs">
              {Object.entries(itemsByPhase).map(([phase, items]) => {
                const subtotalPhase = items.reduce((acc, it) => acc + (it.calculatedQuantity * it.unitPrice), 0);
                return (
                  <React.Fragment key={phase}>
                    <tr className="bg-slate-900/90 font-sans">
                      <td colSpan={5} className="py-2.5 px-4 font-bold text-blue-400 tracking-wider text-xs uppercase">
                        📂 {phase}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-300 text-xs">
                        Bs. {formatCurrency(subtotalPhase)}
                      </td>
                      <td></td>
                    </tr>
                    {items.map((item, idx) => {
                      const parcial = item.calculatedQuantity * item.unitPrice;
                      return (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-2 px-3 text-center text-slate-500 font-bold">
                            {idx + 1}
                          </td>
                          <td className="py-2 px-4 font-sans text-slate-200">
                            {item.description}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span className="text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded text-[11px] font-bold">
                              {item.unit}
                            </span>
                          </td>
                          <td className="py-2 px-4 text-right">
                            <input
                              type="number"
                              step="0.01"
                              value={item.calculatedQuantity}
                              onChange={(e) => handleUpdateQuantity(item.id, parseFloat(e.target.value) || 0)}
                              className="w-24 text-right bg-slate-900 text-slate-100 font-bold border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                            />
                          </td>
                          <td className="py-2 px-4 text-right">
                            <input
                              type="number"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => handleUpdatePrice(item.id, parseFloat(e.target.value) || 0)}
                              className="w-28 text-right bg-slate-900 text-slate-100 font-bold border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                            />
                          </td>
                          <td className="py-2 px-4 text-right font-bold text-emerald-400 text-sm">
                            Bs. {formatCurrency(parcial)}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-rose-400/60 hover:text-rose-400 p-1 transition-colors"
                              title="Quitar ítem del proyecto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-900 border-t-2 border-slate-700 font-mono">
              <tr>
                <td colSpan={5} className="py-4 px-4 font-sans font-bold text-sm text-right text-slate-300">
                  TOTAL GENERAL PRESUPUESTO OFICIAL (Bs):
                </td>
                <td className="py-4 px-4 text-right text-lg font-black text-emerald-400">
                  Bs. {formatCurrency(totalPresupuesto)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
