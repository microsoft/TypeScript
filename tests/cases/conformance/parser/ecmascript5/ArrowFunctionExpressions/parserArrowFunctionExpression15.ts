// @allowjs: true
// @checkjs: true
// @outdir: out
// @target: es3,es6

// @filename: fileJs.js
false ? (param): string => param : null // Not legal JS; "Unexpected token ':'" at last colon

// @filename: fileTs.ts
false ? (param): string => param : null
