// @declaration: true
// @lib: es2015

// @filename: bug.ts
export const SYMBOL = Symbol()

export interface Interface {
  readonly [SYMBOL]: string; // remove readonly and @showEmit to see the expected error
}

export function createInstance(): Interface {
  return {
    [SYMBOL]: ''
  }
}

// @filename: index.ts
import { createInstance } from './bug'

export const spread = {
  ...createInstance(),
}