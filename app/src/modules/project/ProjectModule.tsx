import React from 'react';
import { Building2, Calendar, MapPin, User, FileText, CheckCircle2 } from 'lucide-react';
import type { ProjectMetadata } from '../../types';

interface Props {
  metadata: ProjectMetadata;
  onChange: (updated: ProjectMetadata) => void;
}

export const ProjectModule: React.FC<Props> = ({ metadata, onChange }) => {
  const handleChange = (field: keyof ProjectMetadata, value: any) => {
    onChange({
      ...metadata,
      [field]: value
    });
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 backdrop-blur shadow-2xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-blue-600/20 text-blue-400 rounded-lg">
            <Building2 className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Ficha Técnica & Datos del Proyecto</h2>
            <p className="text-sm text-slate-400">
              Información oficial municipal según normativa GAMEA y registro SISIN
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          En Formulación
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Identificación */}
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" /> Identificación SISIN
          </h3>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Código SISIN</label>
            <input
              type="text"
              value={metadata.sisin}
              onChange={(e) => handleChange('sisin', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 font-mono focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Nombre del Proyecto</label>
            <textarea
              rows={2}
              value={metadata.projectName}
              onChange={(e) => handleChange('projectName', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none resize-none font-medium"
            />
          </div>
        </div>

        {/* Localización */}
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Ubicación Geográfica
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Distrito Municipal</label>
              <input
                type="text"
                value={metadata.distrito}
                onChange={(e) => handleChange('distrito', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Zona / Localización</label>
              <input
                type="text"
                value={metadata.localization}
                onChange={(e) => handleChange('localization', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Ciudad</label>
              <input
                type="text"
                value={metadata.ciudad}
                onChange={(e) => handleChange('ciudad', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Departamento</label>
              <input
                type="text"
                value={metadata.departamento}
                onChange={(e) => handleChange('departamento', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Responsables y Plazo */}
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4" /> Proyectista & Plazos
          </h3>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Proyectista Responsable</label>
            <input
              type="text"
              value={metadata.proyectista}
              onChange={(e) => handleChange('proyectista', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Área Técnica</label>
              <input
                type="text"
                value={metadata.areaResponsable}
                onChange={(e) => handleChange('areaResponsable', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-400" /> Plazo (Días)
              </label>
              <input
                type="number"
                value={metadata.plazoEjecucionDias}
                onChange={(e) => handleChange('plazoEjecucionDias', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-slate-200 font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alcance y compromisos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800">
          <label className="block text-xs font-medium text-slate-400 mb-2">Descripción y Alcance Técnico</label>
          <textarea
            rows={3}
            value={metadata.alcance}
            onChange={(e) => handleChange('alcance', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-md p-2.5 text-sm text-slate-300 focus:border-blue-500 focus:outline-none resize-none leading-relaxed"
          />
        </div>
        <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800">
          <label className="block text-xs font-medium text-slate-400 mb-2">Compromisos de la Junta Vecinal / Beneficiarios</label>
          <textarea
            rows={3}
            value={metadata.compromisosJunta}
            onChange={(e) => handleChange('compromisosJunta', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-md p-2.5 text-sm text-slate-300 focus:border-blue-500 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
