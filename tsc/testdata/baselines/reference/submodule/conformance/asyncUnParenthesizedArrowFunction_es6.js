//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncUnParenthesizedArrowFunction_es6.ts] ////

//// [asyncUnParenthesizedArrowFunction_es6.ts]
declare function someOtherFunction(i: any): Promise<void>;
const x = async i => await someOtherFunction(i)
const x1 = async (i) => await someOtherFunction(i);

//// [asyncUnParenthesizedArrowFunction_es6.js]
const x = async i => await someOtherFunction(i);
const x1 = async (i) => await someOtherFunction(i);
