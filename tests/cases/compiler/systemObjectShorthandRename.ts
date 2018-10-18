// @module: system
// @target: es2015
// @filename: x.ts
export const x = 'X'
// @filename: index.ts
import {x} from './x.js'

const x2 = {x}
const a = {x2}

const x3 = x
const b = {x3}