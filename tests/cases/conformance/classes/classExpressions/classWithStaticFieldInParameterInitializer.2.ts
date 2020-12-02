// @target: esnext,es2015,es5
// @noTypesAndSymbols: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/36295
class C {}
((b = class extends C { static x = 1 }) => { var C; })();

const x = "";
((b = class extends C { static x = 1 }, d = x) => { var x; })();