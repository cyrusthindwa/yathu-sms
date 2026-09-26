export function truncate(word: string, maxLength: number) {
  return word.length > maxLength
    ? word.slice(0, maxLength) + "..."
    : word;
}