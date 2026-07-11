// next/image blokuje optymalizację SVG ze względów bezpieczeństwa (ryzyko XSS),
// więc pliki .svg trzeba renderować z unoptimized, a pozostałe formaty mogą
// korzystać z realnej kompresji WebP/AVIF.
export function isSvgUrl(url: string): boolean {
  return url.toLowerCase().endsWith('.svg');
}
