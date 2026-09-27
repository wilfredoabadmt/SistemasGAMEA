/**
 * Helper to convert numerical numbers to literal text in Spanish (Bolivianos)
 */
export function numberToBolivianosLiteral(n: number): string {
  if (isNaN(n) || n === 0) return 'CERO 00/100 BOLIVIANOS';
  
  const entero = Math.floor(Math.abs(n));
  const centavos = Math.round((Math.abs(n) - entero) * 100);
  const centavosStr = centavos.toString().padStart(2, '0');

  function unidades(num: number): string {
    switch (num) {
      case 1: return 'UN';
      case 2: return 'DOS';
      case 3: return 'TRES';
      case 4: return 'CUATRO';
      case 5: return 'CINCO';
      case 6: return 'SEIS';
      case 7: return 'SIETE';
      case 8: return 'OCHO';
      case 9: return 'NUEVE';
      default: return '';
    }
  }

  function decenas(num: number): string {
    if (num < 10) return unidades(num);
    if (num === 10) return 'DIEZ';
    if (num === 11) return 'ONCE';
    if (num === 12) return 'DOCE';
    if (num === 13) return 'TRECE';
    if (num === 14) return 'CATORCE';
    if (num === 15) return 'QUINCE';
    if (num < 20) return 'DIECI' + unidades(num - 10);
    if (num === 20) return 'VEINTE';
    if (num < 30) return 'VEINTI' + unidades(num - 20);
    
    const d = Math.floor(num / 10);
    const u = num % 10;
    const decMap = ['', '', '', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
    return u === 0 ? decMap[d] : `${decMap[d]} Y ${unidades(u)}`;
  }

  function centenas(num: number): string {
    if (num === 100) return 'CIEN';
    if (num < 100) return decenas(num);
    const c = Math.floor(num / 100);
    const r = num % 100;
    const cenMap = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
    return r === 0 ? cenMap[c] : `${cenMap[c]} ${decenas(r)}`;
  }

  function miles(num: number): string {
    if (num < 1000) return centenas(num);
    const m = Math.floor(num / 1000);
    const r = num % 1000;
    const pref = m === 1 ? 'MIL' : `${centenas(m)} MIL`;
    return r === 0 ? pref : `${pref} ${centenas(r)}`;
  }

  function millones(num: number): string {
    if (num < 1000000) return miles(num);
    const mill = Math.floor(num / 1000000);
    const r = num % 1000000;
    const pref = mill === 1 ? 'UN MILLON' : `${centenas(mill)} MILLONES`;
    return r === 0 ? pref : `${pref} ${miles(r)}`;
  }

  return `${millones(entero)} ${centavosStr}/100 BOLIVIANOS`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-BO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
