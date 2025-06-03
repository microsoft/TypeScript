//// [tests/cases/compiler/declarationEmitShadowing.ts] ////

//// [declarationEmitShadowing.ts]
export class A<T = any> {
  public readonly ShadowedButDoesNotRequireRenaming = <T>(): T => {
      return null as any
  }
}

export function needsRenameForShadowing<T>() {
  type A = T
  return function O<T>(t: A, t2: T) {
  }
}


//// [declarationEmitShadowing.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
exports.needsRenameForShadowing = needsRenameForShadowing;
class A {
    ShadowedButDoesNotRequireRenaming = () => {
        return null;
    };
}
exports.A = A;
function needsRenameForShadowing() {
    return function O(t, t2) {
    };
}


//// [declarationEmitShadowing.d.ts]
export declare class A<T = any> {
    readonly ShadowedButDoesNotRequireRenaming: <T_1>() => T_1;
}
export declare function needsRenameForShadowing<T>(): <T>(t: T_1, t2: T) => void;


//// [DtsFileErrors]


declarationEmitShadowing.d.ts(4,62): error TS2304: Cannot find name 'T_1'.


==== declarationEmitShadowing.d.ts (1 errors) ====
    export declare class A<T = any> {
        readonly ShadowedButDoesNotRequireRenaming: <T_1>() => T_1;
    }
    export declare function needsRenameForShadowing<T>(): <T>(t: T_1, t2: T) => void;
                                                                 ~~~
!!! error TS2304: Cannot find name 'T_1'.
    