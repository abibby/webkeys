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
  const params: any[] = [];

  for (const imp of imports) {
    if (imp == "exports") {
      params.push(exports);
    } else {
      params.push(registered.get(imp));
    }
  }
  console.log("run", name);

  run(...params);
  registered.set(name, exports);
}
