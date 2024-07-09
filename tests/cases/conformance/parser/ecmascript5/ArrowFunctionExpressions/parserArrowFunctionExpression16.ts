// @allowjs: true
// @checkjs: true
// @outdir: out
// @target: es6

// @filename: fileJs.js
true ? false ? (param): string => param : null : null // Not legal JS; "Unexpected token ':'" at last colon

// @filename: fileTs.ts
true ? false ? (param): string => param : null : null
