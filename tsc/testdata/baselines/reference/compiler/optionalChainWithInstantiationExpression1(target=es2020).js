//// [tests/cases/compiler/optionalChainWithInstantiationExpression1.ts] ////

//// [optionalChainWithInstantiationExpression1.ts]
declare namespace A {
    export class b<T> {
        static d: number;
        constructor(x: T);
    }
}

type c = unknown;

declare const a: typeof A | undefined;

a?.b<c>.d;

a?.b.d


//// [optionalChainWithInstantiationExpression1.js]
"use strict";
(a?.b).d;
a?.b.d;
