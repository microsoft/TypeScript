// @module: commonjs
// @target: es2015
export {}
declare global { var x: any }
global.x // should not suggest `global` (GH#42209)
