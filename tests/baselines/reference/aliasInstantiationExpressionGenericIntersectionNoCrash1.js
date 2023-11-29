//// [tests/cases/compiler/aliasInstantiationExpressionGenericIntersectionNoCrash1.ts] ////

//// [aliasInstantiationExpressionGenericIntersectionNoCrash1.ts]
class ErrImpl<E> {
  e!: E;
}

declare const Err: typeof ErrImpl & (<T>() => T);

type ErrAlias<U> = typeof Err<U>;

declare const e: ErrAlias<number>;
e as ErrAlias<string>;


//// [aliasInstantiationExpressionGenericIntersectionNoCrash1.js]
"use strict";
var ErrImpl = /** @class */ (function () {
    function ErrImpl() {
    }
    return ErrImpl;
}());
e;
