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

export function onUserInteraction(e: HTMLElement, cb: () => void) {
  const handler = () => {
    cb();
    e.removeEventListener("blur", handler);
    e.removeEventListener("input", handler);
    e.removeEventListener("keydown", handler);
  };
  e.addEventListener("blur", handler);
  e.addEventListener("input", handler);
  e.addEventListener("keydown", handler);
}
