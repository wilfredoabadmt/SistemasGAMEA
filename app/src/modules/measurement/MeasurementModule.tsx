import React, { useState } from 'react';
import { Ruler, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import type { ProjectItem, DimensionEntry } from '../../types';

interface Props {
  projectItems: ProjectItem[];
  onUpdateItems: (items: ProjectItem[]) => void;
}

export const MeasurementModule: React.FC<Props> = ({ projectItems, onUpdateItems }) => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(
    projectItems.length > 0 ? projectItems[0].id : null
  );

  const toggleExpand = (id: string) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleAddDimension = (itemRowId: string) => {
    const updated = projectItems.map(item => {
      if (item.id === itemRowId) {
        const newDim: DimensionEntry = {
          id: `dim-${Date.now()}`,
          description: 'Nuevo tramo o elemento',
          largo: 1,
          ancho: 1,
          alto: 1,
          area: 1,
          volumen: 1,
          parcial: 1
        };
        const newDims = [...item.dimensions, newDim];
        const newTotal = newDims.reduce((acc, d) => acc + d.parcial, 0);
        return {
          ...item,
          dimensions: newDims,
          calculatedQuantity: parseFloat(newTotal.toFixed(2))
        };
      }
      return item;
    });
    onUpdateItems(updated);
  };

  const handleUpdateDimension = (
    itemRowId: string,
    dimId: string,
    field: keyof DimensionEntry,
    value: any
  ) => {
    const updated = projectItems.map(item => {
      if (item.id === itemRowId) {
        const newDims = item.dimensions.map(dim => {
          if (dim.id === dimId) {
            const updatedDim = { ...dim, [field]: value };
            
            // Recálculo automático geométrico
            const largo = field === 'largo' ? parseFloat(value) || 0 : dim.largo;
            const ancho = field === 'ancho' ? parseFloat(value) || 0 : dim.ancho;
            const alto = field === 'alto' ? parseFloat(value) || 0 : dim.alto;

            const area = largo * (ancho || 1);
            const volumen = largo * (ancho || 1) * (alto || 1);
            
            // Según la unidad del ítem
            let parcial = updatedDim.parcial;
            if (field !== 'parcial') {
              if (item.unit === 'M3') {
                parcial = volumen;
              } else if (item.unit === 'M2') {
                parcial = area;
              } else if (item.unit === 'ML') {
                parcial = largo;
              }
            } else {
              parcial = parseFloat(value) || 0;
            }

            return {
              ...updatedDim,
              largo,
              ancho,
              alto,
              area: parseFloat(area.toFixed(2)),
              volumen: parseFloat(volumen.toFixed(2)),
              parcial: parseFloat(parcial.toFixed(2))
            };
          }
          return dim;
        });

        const newTotal = newDims.reduce((acc, d) => acc + d.parcial, 0);
        return {
          ...item,
          dimensions: newDims,
          calculatedQuantity: parseFloat(newTotal.toFixed(2))
        };
      }
      return item;
    });
    onUpdateItems(updated);
  };

  const handleDeleteDimension = (itemRowId: string, dimId: string) => {
    const updated = projectItems.map(item => {
      if (item.id === itemRowId) {
        const newDims = item.dimensions.filter(d => d.id !== dimId);
        const newTotal = newDims.reduce((acc, d) => acc + d.parcial, 0);
        return {
          ...item,
          dimensions: newDims,
          calculatedQuantity: parseFloat(newTotal.toFixed(2))
        };
      }
      return item;
    });
    onUpdateItems(updated);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 backdrop-blur shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <Ruler className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">Cómputos Métricos Geométricos</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Desglose paramétrico dimensional (Largo × Ancho × Alto) y cálculo de volúmenes de obra
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {projectItems.map((item, idx) => {
          const isExpanded = expandedItemId === item.id;
          return (
            <div
              key={item.id}
              className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/60 transition-all"
            >
              {/* Header del Ítem */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="flex items-center justify-between p-4 bg-slate-900/90 hover:bg-slate-800/60 cursor-pointer select-none border-b border-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 hover:text-slate-300">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Ítem #{idx + 1}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.phase}
                  </span>
                  <span className="font-medium text-sm text-slate-100">{item.description}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Total Cómputo: </span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {item.calculatedQuantity.toFixed(2)} {item.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detalle de Cómputo Dimensional */}
              {isExpanded && (
                <div className="p-4 space-y-3 bg-slate-950/40">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-sans uppercase">
                          <th className="py-2 px-3">Detalle / Tramo</th>
                          <th className="py-2 px-2 w-24 text-center">Largo (m)</th>
                          <th className="py-2 px-2 w-24 text-center">Ancho (m)</th>
                          <th className="py-2 px-2 w-24 text-center">Alto (m)</th>
                          <th className="py-2 px-2 w-24 text-center">Área (m²)</th>
                          <th className="py-2 px-2 w-24 text-center">Volumen (m³)</th>
                          <th className="py-2 px-3 w-32 text-right">Cómputo Parcial</th>
                          <th className="py-2 px-2 w-16 text-center"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {item.dimensions.map((dim) => (
                          <tr key={dim.id} className="hover:bg-slate-900/50">
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={dim.description}
                                onChange={(e) => handleUpdateDimension(item.id, dim.id, 'description', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-blue-500 font-sans"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="number"
                                step="0.01"
                                value={dim.largo}
                                onChange={(e) => handleUpdateDimension(item.id, dim.id, 'largo', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-center text-slate-200 focus:outline-none focus:border-blue-500"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="number"
                                step="0.01"
                                value={dim.ancho}
                                onChange={(e) => handleUpdateDimension(item.id, dim.id, 'ancho', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-center text-slate-200 focus:outline-none focus:border-blue-500"
                              />
                            </td>
                            <td className="py-2 px-2">
                              <input
                                type="number"
                                step="0.01"
                                value={dim.alto}
                                onChange={(e) => handleUpdateDimension(item.id, dim.id, 'alto', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-center text-slate-200 focus:outline-none focus:border-blue-500"
                              />
                            </td>
                            <td className="py-2 px-2 text-center text-slate-400">
                              {dim.area}
                            </td>
                            <td className="py-2 px-2 text-center text-slate-400">
                              {dim.volumen}
                            </td>
                            <td className="py-2 px-3 text-right">
                              <input
                                type="number"
                                step="0.01"
                                value={dim.parcial}
                                onChange={(e) => handleUpdateDimension(item.id, dim.id, 'parcial', e.target.value)}
                                className="w-28 text-right bg-slate-900 font-bold text-amber-400 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                              />
                            </td>
                            <td className="py-2 px-2 text-center">
                              <button
                                onClick={() => handleDeleteDimension(item.id, dim.id)}
                                className="text-rose-400/70 hover:text-rose-400 p-1 transition-colors"
                                title="Eliminar medición"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => handleAddDimension(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Agregar Fila de Medición
                    </button>

                    <div className="text-xs text-slate-400 font-sans">
                      Suma Parciales: <span className="font-mono font-bold text-slate-200">{item.calculatedQuantity} {item.unit}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
