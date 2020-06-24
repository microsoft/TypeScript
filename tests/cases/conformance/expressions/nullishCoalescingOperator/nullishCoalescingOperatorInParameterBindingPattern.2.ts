// @target: esnext,es2015,es5
// @noTypesAndSymbols: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/36295
const a = (): string | undefined => undefined;
(({ [a() ?? "d"]: c = "" }) => { var a; })();

const x = "";
(({ [a() ?? "d"]: c = "", d = x }) => { var x; })();