//// [tests/cases/compiler/staticIndexSignatureAndNormalIndexSignature.ts] ////

//// [staticIndexSignatureAndNormalIndexSignature.ts]
class Foo {
    [p: string]: any;
    static [p: string]: number;
}

//// [staticIndexSignatureAndNormalIndexSignature.js]
"use strict";
class Foo {
}
