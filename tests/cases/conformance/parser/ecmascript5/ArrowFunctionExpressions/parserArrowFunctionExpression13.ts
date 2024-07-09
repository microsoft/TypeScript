// @allowjs: true
// @checkjs: true
// @outdir: out
// @target: es6

// @filename: fileJs.js
a ? () => a() : (): any => null; // Not legal JS; "Unexpected token ')'" at last paren

// @filename: fileTs.ts
a ? () => a() : (): any => null;
