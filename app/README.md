# Sistema Modular de Planillas y Cómputos Métricos (GAMEA)

Aplicación web modular y escalable diseñada bajo la metodología **SDD (Software Design Document)** y estándares de la Secretaría Municipal de Planificación e Infraestructura Urbana del **Gobierno Autónomo Municipal de El Alto (GAMEA)**.

---

## 🛠️ Tecnologías y Arquitectura

- **Frontend:** React 19 + TypeScript + Vite.
- **Estilos y Componentes:** TailwindCSS v4 + Lucide Icons + Google Fonts (`Plus Jakarta Sans` y `JetBrains Mono`).
- **Procesamiento de Datos:** SheetJS (`xlsx`) para exportación en formato idéntico a las planillas oficiales municipales.
- **Base de Datos de Ítems:** Indexación completa de **1,652 ítems** de obras menores y mayores clasificados por áreas (`ARQU`, `ESTR`, `SANI`, `ELEC`, `HIDR`, `VIAL`, `TERMO`).

---

## 📦 Módulos del Sistema (SDD)

1. **`BudgetModule` (Hoja B1):**
   - Planilla oficial de volúmenes de obra y presupuesto.
   - Cálculo en tiempo real de parciales y total general en Bolivianos.
   - Conversor automático de cifras numéricas a literal oficial (ej. *VEINTITRES MIL CUATROCIENTOS CINCUENTA Y DOS 50/100 BOLIVIANOS*).
   - Exportación directa a `.xlsx`.

2. **`MeasurementModule` (Hoja COMPUTO):**
   - Cómputos métricos geométricos paramétricos (`Largo × Ancho × Alto`).
   - Soporte para desgloses por tramos o sectores con auto-cálculo de áreas ($m^2$) y volúmenes ($m^3$).

3. **`ScheduleModule` (Hoja CRONOG):**
   - Planificación temporal por días calendario ($D/C$).
   - Diagrama Gantt interactivo con asignación de inicio y duración por actividad.

4. **`CatalogModule` (Hoja BD):**
   - Explorador de alta densidad con búsqueda reactiva en los 1,652 ítems.
   - Filtros por áreas de especialidad y adición instantánea al presupuesto activo.

5. **`ProjectModule` (Hojas DATOS y FICHA TECNICA):**
   - Registro de datos institucionales: Código SISIN, Distrito, Urbanización, Proyectista, Alcance Técnico y Compromisos Vecinales.

---

## 🚀 Cómo Ejecutar la Aplicación

Para iniciar el servidor de desarrollo local:

```bash
cd app
npm install
npm run dev
```

Abre en tu navegador: [http://localhost:5173](http://localhost:5173)
