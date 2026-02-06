// @target: es2015
// @filename: typedefOnSemicolonClassElement.js
// @checkJs: true
// @outdir: dist
// @declaration: true
export class Preferences {
  /** @typedef {string} A */
  ;
  /** @type {A} */
  a = 'ok'
}
