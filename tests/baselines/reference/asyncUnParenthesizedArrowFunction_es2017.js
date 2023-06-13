//// [tests/cases/conformance/async/es2017/asyncArrowFunction/asyncUnParenthesizedArrowFunction_es2017.ts] ////

//// [asyncUnParenthesizedArrowFunction_es2017.ts]
declare function someOtherFunction(i: any): Promise<void>;
const x = async i => await someOtherFunction(i)
const x1 = async (i) => await someOtherFunction(i);

//// [asyncUnParenthesizedArrowFunction_es2017.js]
const x = async (i) => await someOtherFunction(i);
const x1 = async (i) => await someOtherFunction(i);
