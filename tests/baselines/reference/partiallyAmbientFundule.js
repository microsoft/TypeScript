//// [tests/cases/compiler/partiallyAmbientFundule.ts] ////

//// [partiallyAmbientFundule.ts]
declare module foo {
    export function x(): any;
}
function foo () { } // Legal, because module is ambient

//// [partiallyAmbientFundule.js]
function foo() { } // Legal, because module is ambient
