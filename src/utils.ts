export function getName(i: number, len = 0): string {
  const a = "a".charCodeAt(0);
  const base = 26;
  return i
    .toString(base)
    .split("")
    .map((c) => String.fromCharCode(a + parseInt(c, base)))
    .join("")
    .padStart(len, "a");
}
