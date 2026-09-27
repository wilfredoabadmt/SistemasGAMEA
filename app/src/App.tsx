import { useState } from 'react';
import {
  FileSpreadsheet,
  BookOpen,
  Building2,
  Ruler,
  Calendar,
  Download
} from 'lucide-react';
import type { CatalogItem, ProjectItem, ProjectMetadata } from './types';
import { INITIAL_CATALOG, DEFAULT_METADATA, INITIAL_PROJECT_ITEMS, PHASES_LIST } from './data/initialData';
import { CatalogModule } from './modules/catalog/CatalogModule';
import { ProjectModule } from './modules/project/ProjectModule';
import { MeasurementModule } from './modules/measurement/MeasurementModule';
import { BudgetModule } from './modules/budget/BudgetModule';
import { ScheduleModule } from './modules/schedule/ScheduleModule';
import { exportProjectToExcel } from './utils/excelExporter';
import { formatCurrency } from './utils/numberToLiteral';

type ActiveTab = 'budget' | 'catalog' | 'measurement' | 'schedule' | 'project';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('budget');
  const [catalog] = useState<CatalogItem[]>(INITIAL_CATALOG);
  const [metadata, setMetadata] = useState<ProjectMetadata>(DEFAULT_METADATA);
  const [projectItems, setProjectItems] = useState<ProjectItem[]>(INITIAL_PROJECT_ITEMS);

  // Agregar ítem desde el catálogo
  const handleAddItemFromCatalog = (item: CatalogItem) => {
    // Si ya existe, no duplicar
    if (projectItems.some(pi => pi.itemId === item.id)) return;

    const newItem: ProjectItem = {
      id: `pi-${Date.now()}`,
      itemId: item.id,
      itemNumber: projectItems.length + 1,
      phase: PHASES_LIST[0],
      description: item.description,
      unit: item.unit,
      unitPrice: item.unitPrice,
      calculatedQuantity: 1,
      daysDuration: 5,
      startDay: 1,
      dimensions: [
        {
          id: `dim-${Date.now()}`,
          description: 'Medición base',
          largo: 1,
          ancho: 1,
          alto: 1,
          area: 1,
          volumen: 1,
          parcial: 1
        }
      ]
    };
    setProjectItems([...projectItems, newItem]);
  };

  const handleRemoveProjectItem = (rowId: string) => {
    setProjectItems(projectItems.filter(pi => pi.id !== rowId));
  };

  const handleUpdateSchedule = (id: string, startDay: number, duration: number) => {
    setProjectItems(
      projectItems.map(item => {
        if (item.id === id) {
          return { ...item, startDay, daysDuration: duration };
        }
        return item;
      })
    );
  };

  const totalPresupuesto = projectItems.reduce(
    (acc, it) => acc + it.calculatedQuantity * it.unitPrice,
    0
  );

  return (
    <div className="min-h-screen bg-[#090d14] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Municipal Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-900/30">
              <FileSpreadsheet className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  GAMEA v2.0
                </span>
                <span className="text-xs text-slate-400 font-mono">SISIN: {metadata.sisin}</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
                Sistema de Planillas y Cómputos Métricos
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Total Presupuesto
              </span>
              <span className="font-mono text-emerald-400 font-bold text-sm">
                Bs. {formatCurrency(totalPresupuesto)}
              </span>
            </div>

            <button
              onClick={() => exportProjectToExcel(metadata, projectItems)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar Excel</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Header Tabs */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2.5">
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'budget'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Presupuesto (B1)
            </button>

            <button
              onClick={() => setActiveTab('measurement')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'measurement'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Ruler className="w-4 h-4" />
              Cómputos Métricos
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Cronograma Gantt
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'catalog'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Catálogo & APUs ({catalog.length})
            </button>

            <button
              onClick={() => setActiveTab('project')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'project'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Ficha Técnica
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'budget' && (
          <BudgetModule
            metadata={metadata}
            projectItems={projectItems}
            onUpdateItems={setProjectItems}
            onRemoveItem={handleRemoveProjectItem}
          />
        )}

        {activeTab === 'measurement' && (
          <MeasurementModule
            projectItems={projectItems}
            onUpdateItems={setProjectItems}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleModule
            projectItems={projectItems}
            totalDays={metadata.plazoEjecucionDias}
            onUpdateItemSchedule={handleUpdateSchedule}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogModule
            catalog={catalog}
            onSelectItem={handleAddItemFromCatalog}
            selectedItemIds={projectItems.map(pi => pi.itemId)}
          />
        )}

        {activeTab === 'project' && (
          <ProjectModule
            metadata={metadata}
            onChange={setMetadata}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Gobierno Autónomo Municipal de El Alto &copy; 2026 - Dirección de Proyectos Municipales. Módulo de Cómputos y Planillas SDD.
      </footer>
    </div>
  );
}

export default App;
