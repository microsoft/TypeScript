//// [tests/cases/compiler/declarationEmitReadonlyComputedProperty.ts] ////

//// [bug.ts]
export const SYMBOL = Symbol()

export interface Interface {
  readonly [SYMBOL]: string; // remove readonly and @showEmit to see the expected error
}

export function createInstance(): Interface {
  return {
    [SYMBOL]: ''
  }
}

//// [index.ts]
import { createInstance } from './bug'

export const spread = {
  ...createInstance(),
}

//// [bug.js]
export const SYMBOL = Symbol();
export function createInstance() {
    return {
        [SYMBOL]: ''
    };
}
//// [index.js]
import { createInstance } from './bug';
export const spread = Object.assign({}, createInstance());


//// [bug.d.ts]
export declare const SYMBOL: unique symbol;
export interface Interface {
    readonly [SYMBOL]: string;
}
export declare function createInstance(): Interface;
