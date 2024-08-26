// @allowjs: true
// @checkjs: true
// @outdir: out
// @target: es6

// @filename: fileJs.js
a() ? (b: number, c?: string): void => d() : e; // Not legal JS; "Unexpected token ':'" at first colon

// @filename: fileTs.ts
a() ? (b: number, c?: string): void => d() : e;
