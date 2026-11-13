const numero = new Intl.NumberFormat('es-EC', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function fmtNumero(v: number | null | undefined): string {
    return v === null || v === undefined ? '—' : numero.format(v);
}

export function fmtPorcentaje(v: number | null | undefined): string {
    return v === null || v === undefined ? '—' : `${numero.format(v)} %`;
}

// dd/mm/aaaa
export function fmtFecha(d: Date | null | undefined): string {
    if (!d) return '—';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}/${d.getFullYear()}`;
}

export function fmtTamano(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${numero.format(bytes / 1024)} KB`;
    return `${numero.format(bytes / 1024 / 1024)} MB`;
}

export function ultimoDiaMesAnterior(): Date {
    const h = new Date();
    return new Date(h.getFullYear(), h.getMonth(), 0);
}

export function alternarOscuro(): boolean {
    return document.documentElement.classList.toggle('dark');
}

// Descarga simulada: genera un CSV de ejemplo en el navegador (en RiskWeb el Excel lo hace el backend).
export function descargarCsv(nombre: string, encabezados: string[], filas: (string | number | null)[][]): void {
    const esc = (v: string | number | null) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = ['DATOS DE EJEMPLO', encabezados.map(esc).join(';'), ...filas.map((f) => f.map(esc).join(';'))].join('\r\n');
    const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
