//// [tests/cases/compiler/declarationEmitReadonlyComputedProperty.ts] ////

//// [bug.ts]
export const SYMBOL: unique symbol = Symbol()

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

export const spread: {
    [SYMBOL]: string
} = {
  ...createInstance(),
}

/// [Declarations] ////



//// [bug.d.ts]
export declare const SYMBOL: unique symbol;
export interface Interface {
    readonly [SYMBOL]: string;
}
export declare function createInstance(): Interface;
//# sourceMappingURL=bug.d.ts.map
//// [index.d.ts]
export declare const spread: {
    [SYMBOL]: string;
};
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

index.ts(4,5): error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
index.ts(4,6): error TS2552: Cannot find name 'SYMBOL'. Did you mean 'Symbol'?


==== bug.ts (0 errors) ====
    export const SYMBOL: unique symbol = Symbol()
    
    export interface Interface {
      readonly [SYMBOL]: string; // remove readonly and @showEmit to see the expected error
    }
    
    export function createInstance(): Interface {
      return {
        [SYMBOL]: ''
      }
    }
    
==== index.ts (2 errors) ====
    import { createInstance } from './bug'
    
    export const spread: {
        [SYMBOL]: string
        ~~~~~~~~
!!! error TS1170: A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.
         ~~~~~~
!!! error TS2552: Cannot find name 'SYMBOL'. Did you mean 'Symbol'?
!!! related TS2728 lib.es2015.symbol.d.ts:--:--: 'Symbol' is declared here.
    } = {
      ...createInstance(),
    }