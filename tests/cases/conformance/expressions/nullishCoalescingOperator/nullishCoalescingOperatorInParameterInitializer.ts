// @target: esnext,es2015,es5
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/36295
const a = (): string | undefined => undefined;
((b = a() ?? "d") => {})();