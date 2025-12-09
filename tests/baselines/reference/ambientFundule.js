//// [tests/cases/compiler/ambientFundule.ts] ////

//// [ambientFundule.ts]
declare function f();
declare namespace f { var x }
declare function f(x);

//// [ambientFundule.js]
