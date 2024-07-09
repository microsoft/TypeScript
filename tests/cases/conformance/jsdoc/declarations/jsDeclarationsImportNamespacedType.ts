// @declaration: true
// @emitDeclarationOnly: true
// @checkJs: true
// @filename: file.js
import { dummy } from './mod1'
/** @type {import('./mod1').Dotted.Name} - should work */
var dot2

// @filename: mod1.js
/** @typedef {number} Dotted.Name */
export var dummy = 1
