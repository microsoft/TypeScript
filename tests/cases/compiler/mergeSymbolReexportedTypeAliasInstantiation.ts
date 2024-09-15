// @moduleResolution: node

// @filename: main.ts
import {Row2, C} from '.'
const x: ((rowData: Row2<string>) => unknown) = (rowData: Row2<any>) => (null)
const y : C = { s: '' }

// @filename: ./a.d.ts
import '.'
declare module '.' {
  type Row2<T> = {}
  type C = { s : string }
}

// @filename: ./index.d.ts
export type {Row2} from './common';

// @filename: ./common.d.ts
export interface Row2 {}