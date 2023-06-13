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
a?.();
a?.();
