//// [tests/cases/compiler/declarationEmitLambdaWithMissingTypeParameterNoCrash.ts] ////

//// [declarationEmitLambdaWithMissingTypeParameterNoCrash.ts]
export interface Foo {
    preFetch: <T1 extends T2> (c: T1) => void; // Type T2 is not defined
    preFetcher: new <T1 extends T2> (c: T1) => void; // Type T2 is not defined
}


//// [declarationEmitLambdaWithMissingTypeParameterNoCrash.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [declarationEmitLambdaWithMissingTypeParameterNoCrash.d.ts]
export interface Foo {
    preFetch: <T1 extends T2>(c: T1) => void;
    preFetcher: new <T1 extends T2>(c: T1) => void;
}
