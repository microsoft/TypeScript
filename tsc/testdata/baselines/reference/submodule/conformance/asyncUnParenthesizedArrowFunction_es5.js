//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncUnParenthesizedArrowFunction_es5.ts] ////

//// [asyncUnParenthesizedArrowFunction_es5.ts]
declare function someOtherFunction(i: any): Promise<void>;
const x = async i => await someOtherFunction(i)
const x1 = async (i) => await someOtherFunction(i);

//// [asyncUnParenthesizedArrowFunction_es5.js]
const x = async i => await someOtherFunction(i);
const x1 = async (i) => await someOtherFunction(i);
