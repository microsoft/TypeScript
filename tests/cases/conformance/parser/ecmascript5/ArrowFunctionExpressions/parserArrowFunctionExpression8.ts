// @allowjs: true
// @checkjs: true
// @outdir: out
// @target: es3,es6

// @filename: fileJs.js
x ? y => ({ y }) : z => ({ z }) // Legal JS

// @filename: fileTs.ts
x ? y => ({ y }) : z => ({ z })
