// @filename: main.ts
import { c } from './types'
import * as types from './types'
console.log(c) // Fails as expected, import is still allowed though.
console.log(types.c) // Expected an error here.

// @filename: types.ts
export type * from './values'

// @filename: values.ts
export const c = 10