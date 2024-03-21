interface Module {
  registered: boolean;
  name: string;
  imports: string[];
  run: (...args: any) => void;
}

const registered = new Map<string, any>([
  ["require", (name: string) => registered.get(name)],
]);
function define(name: string, imports: string[], run: (...args: any) => void) {
  const exports = {};
  run(
    ...imports.map((imp) => (imp == "exports" ? exports : registered.get(imp)))
  );
  registered.set(name, exports);
}
