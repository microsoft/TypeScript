//// [tests/cases/compiler/aliasInstantiationExpressionGenericIntersectionNoCrash.ts] ////

//// [aliasInstantiationExpressionGenericIntersectionNoCrash.ts]
class ErrImpl<E> {
  e!: E;
}

declare const Err: typeof ErrImpl & (<T>() => T);

type ErrAlias<U> = typeof Err<U>;

declare const e: ErrAlias<number>;
e as ErrAlias<string>;


//// [aliasInstantiationExpressionGenericIntersectionNoCrash.js]
"use strict";
var ErrImpl = /** @class */ (function () {
    function ErrImpl() {
    }
    return ErrImpl;
}());
e;
