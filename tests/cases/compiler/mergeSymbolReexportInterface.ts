// @moduleResolution: node

// @filename: main.ts
import {Row2, C} from '.'
const x : Row2 = { }
const y : C = { s: '' }

 
// @filename: ./a.d.ts
import '.'
declare module '.' {
  type Row2 = { a: string }
  type C = { s : string }
}
 
// @filename: ./index.d.ts
export type {Row2} from './common';
 
// @filename: ./common.d.ts
export interface Row2 { b: string }