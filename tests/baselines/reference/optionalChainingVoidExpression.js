//// [optionalChainingVoidExpression.ts]
type MaybeClosable = {
  close?: () => {};
};

declare const maybe: MaybeClosable;
void maybe.close?.()


//// [optionalChainingVoidExpression.js]
"use strict";
var _a;
(_a = maybe.close) !== null && _a !== void 0 && _a.call(maybe);
