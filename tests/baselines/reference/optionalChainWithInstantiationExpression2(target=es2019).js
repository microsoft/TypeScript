//// [tests/cases/compiler/optionalChainWithInstantiationExpression2.ts] ////

//// [optionalChainWithInstantiationExpression2.ts]
declare interface A {
    c: number;
    <T>(): T;
}

type b = 'b type';

declare const a: A | undefined;

a?.<b>();

a<b>?.();


//// [optionalChainWithInstantiationExpression2.js]
var _a;
a === null || a === void 0 ? void 0 : a();
(_a = (a)) === null || _a === void 0 ? void 0 : _a();
