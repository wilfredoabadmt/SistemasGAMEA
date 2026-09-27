import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, BookOpen, Check } from 'lucide-react';
import type { CatalogItem } from '../../types';
import { formatCurrency } from '../../utils/numberToLiteral';

interface Props {
  catalog: CatalogItem[];
  onSelectItem: (item: CatalogItem) => void;
  selectedItemIds: number[];
}

export const CatalogModule: React.FC<Props> = ({ catalog, onSelectItem, selectedItemIds }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('ALL');

  const areas = useMemo(() => {
    const set = new Set<string>();
    catalog.forEach(item => {
      if (item.area) set.add(item.area);
    });
    return Array.from(set).sort();
  }, [catalog]);

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return catalog.filter(item => {
      const matchSearch = !term || item.description.toLowerCase().includes(term) || item.id.toString().includes(term);
      const matchArea = selectedArea === 'ALL' || item.area === selectedArea;
      return matchSearch && matchArea;
    });
  }, [catalog, searchTerm, selectedArea]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 backdrop-blur shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">Catálogo Base de Datos y APU</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Base oficial de obras menores y mayores del GAMEA ({catalog.length.toLocaleString()} ítems indexados)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700">
            {filteredItems.length} encontrados
          </span>
        </div>
      </div>

      {/* Filtros de búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por descripción o código (ej: acera, excavación, tubería, 512)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="relative">
          <Filter className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
          >
            <option value="ALL">Todas las Áreas ({areas.length})</option>
            {areas.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de ítems de alta densidad */}
      <div className="border border-slate-800/80 rounded-lg overflow-hidden bg-slate-950/60">
        <div className="max-h-[520px] overflow-y-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-900 sticky top-0 z-10 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-20">Cód.</th>
                <th className="py-3 px-3 w-28">Área</th>
                <th className="py-3 px-4">Descripción del Ítem</th>
                <th className="py-3 px-3 w-24 text-center">Unidad</th>
                <th className="py-3 px-4 w-36 text-right">P. Unitario</th>
                <th className="py-3 px-4 w-28 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-mono text-xs">
              {filteredItems.slice(0, 100).map((item) => {
                const isSelected = selectedItemIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-2.5 px-4 text-slate-400 font-semibold">{item.id}</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-blue-300 border border-slate-700/50">
                        {item.area}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-sans text-slate-200">
                      <div className="line-clamp-1">{item.description}</div>
                      {item.specFile && (
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                          {item.specFile}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold">
                        {item.unit}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-100 font-bold">
                      Bs. {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="py-2.5 px-4 text-center font-sans">
                      <button
                        onClick={() => onSelectItem(item)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Añadido
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            Agregar
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              No se encontraron ítems que coincidan con la búsqueda.
            </div>
          )}
        </div>
      </div>
      {filteredItems.length > 100 && (
        <p className="text-xs text-slate-500 text-center">
          Mostrando los primeros 100 resultados de {filteredItems.length}. Usa el buscador para filtrar con mayor precisión.
        </p>
      )}
    </div>
  );
};
