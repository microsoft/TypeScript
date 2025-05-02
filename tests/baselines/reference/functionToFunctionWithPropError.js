//// [tests/cases/compiler/functionToFunctionWithPropError.ts] ////

//// [functionToFunctionWithPropError.ts]
declare let x: { (): string; prop: number };
declare let y: { (): string; }

x = y;
y = x;

//// [functionToFunctionWithPropError.js]
x = y;
y = x;
