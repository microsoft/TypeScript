// @declaration: true
// @lib: es2015
// @isolatedDeclarationFixedDiffReason: There will be separate TS error on 'spread', but fixer does not know about this so it'll try to fix the missing type.

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