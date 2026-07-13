const EXCERPT_LENGTH = 220;

// Cuts on a word boundary so cards never end mid-word.
export function toExcerpt(content: string, maxLength: number = EXCERPT_LENGTH): string {
  const plain = content.replace(/\n+/g, ' ').trim();
  if (plain.length <= maxLength) return plain;
  const truncated = plain.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}
