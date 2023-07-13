//// [tests/cases/compiler/typePredicatesInUnion2.ts] ////

//// [typePredicatesInUnion2.ts]
declare function isString(x: any): x is string;
declare function isNumber(x: any): x is number;
declare function f(p: typeof isString | typeof isNumber): void;
f(isString);
f(isNumber);


//// [typePredicatesInUnion2.js]
f(isString);
f(isNumber);
