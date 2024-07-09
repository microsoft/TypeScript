// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: ex.d.ts
// based on assert in @types/node
export function art(value: any, message?: string | Error): asserts value;
// @Filename: ex2.d.ts
declare function art(value: any, message?: string | Error): asserts value;
export = art;
// @Filename: 38379.js
const { art } = require('./ex')
const artoo = require('./ex2')
let x = 1
art(x)
let y = 1
artoo(y)
