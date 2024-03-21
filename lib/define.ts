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
  const params = imports.map((name) => {
    if (name == "exports") {
      return exports;
    }
    const mod = registered.get(name);
    if (mod === undefined) {
      throw new Error(`module not found: ${name}`);
    }
    return mod;
  });
  run(...params);

  registered.set(name, exports);
}
