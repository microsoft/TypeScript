//// [ambientFundule.ts]
declare function f();
declare module f { var x }
declare function f(x);

//// [ambientFundule.js]
