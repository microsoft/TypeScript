// @target: esnext,es2015,es5
// @noTypesAndSymbols: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/36295
const a = (): string | undefined => undefined;
((b = a() ?? "d") => { var a; })();

const x = "";
((b = a() ?? "d", d = x) => { var x; })();