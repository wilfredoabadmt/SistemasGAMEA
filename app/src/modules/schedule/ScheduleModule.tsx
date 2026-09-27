import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { ProjectItem } from '../../types';

interface Props {
  projectItems: ProjectItem[];
  totalDays: number;
  onUpdateItemSchedule: (id: string, startDay: number, duration: number) => void;
}

export const ScheduleModule: React.FC<Props> = ({
  projectItems,
  totalDays,
  onUpdateItemSchedule
}) => {
  // Generar columnas de tiempo (por semanas o bloques de 5 días para claridad visual)
  const daysBlocks = Math.max(totalDays, 65);
  const weeks = Math.ceil(daysBlocks / 7);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 backdrop-blur shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Calendar className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100">Cronograma de Ejecución de Obra (Hoja CRONOG)</h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Programación de actividades por días calendario ({totalDays} D/C) y diagrama Gantt de obra
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            Plazo Total: <span className="font-bold text-slate-200">{totalDays} Días Calendario</span> ({weeks} Semanas)
          </div>
        </div>
      </div>

      {/* Gantt Interactive Table */}
      <div className="border border-slate-800/80 rounded-lg overflow-x-auto bg-slate-950/60">
        <div className="min-w-[900px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900 sticky top-0 z-10 border-b border-slate-800 font-sans text-slate-400 uppercase">
              <tr>
                <th className="py-3 px-3 w-12 text-center">N°</th>
                <th className="py-3 px-4 w-64">Actividad / Ítem</th>
                <th className="py-3 px-2 w-20 text-center">Inicio</th>
                <th className="py-3 px-2 w-20 text-center">Duración</th>
                <th className="py-3 px-4">
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Día 1</span>
                    <span>Día {Math.round(daysBlocks / 2)}</span>
                    <span>Día {daysBlocks}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-mono">
              {projectItems.map((item, idx) => {
                const start = item.startDay || 1;
                const dur = item.daysDuration || 5;
                const leftPercent = Math.min(100, Math.max(0, ((start - 1) / daysBlocks) * 100));
                const widthPercent = Math.min(100 - leftPercent, Math.max(3, (dur / daysBlocks) * 100));

                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 text-center text-slate-500 font-bold">{idx + 1}</td>
                    <td className="py-3 px-4 font-sans text-slate-200">
                      <div className="font-medium truncate max-w-xs">{item.description}</div>
                      <div className="text-[10px] text-blue-400">{item.phase}</div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min="1"
                        max={daysBlocks}
                        value={start}
                        onChange={(e) => onUpdateItemSchedule(item.id, parseInt(e.target.value) || 1, dur)}
                        className="w-16 text-center bg-slate-900 border border-slate-800 rounded px-1 py-1 text-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min="1"
                        max={daysBlocks}
                        value={dur}
                        onChange={(e) => onUpdateItemSchedule(item.id, start, parseInt(e.target.value) || 1)}
                        className="w-16 text-center bg-slate-900 border border-slate-800 rounded px-1 py-1 text-slate-200 focus:outline-none focus:border-blue-500 font-bold text-amber-400"
                      />
                    </td>
                    <td className="py-3 px-4 relative">
                      <div className="w-full bg-slate-900 h-6 rounded-md overflow-hidden relative border border-slate-800/80">
                        {/* Grid lines */}
                        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-20 divide-x divide-slate-700" />
                        
                        {/* Barra Gantt */}
                        <div
                          style={{
                            left: `${leftPercent}%`,
                            width: `${widthPercent}%`
                          }}
                          className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded text-[10px] text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:brightness-110 transition-all"
                        >
                          {dur}d
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
