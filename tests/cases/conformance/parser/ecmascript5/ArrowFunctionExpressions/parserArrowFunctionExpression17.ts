// @allowjs: true
// @checkjs: true
// @outdir: out
// @target: es3,es6

// @filename: fileJs.js
a ? b : (c) : d => e // Not legal JS; "Unexpected token ':'" at last colon

// @filename: fileTs.ts
a ? b : (c) : d => e
