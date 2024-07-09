//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncUnParenthesizedArrowFunction_es6.ts] ////

//// [asyncUnParenthesizedArrowFunction_es6.ts]
declare function someOtherFunction(i: any): Promise<void>;
const x = async i => await someOtherFunction(i)
const x1 = async (i) => await someOtherFunction(i);

//// [asyncUnParenthesizedArrowFunction_es6.js]
const x = (i) => __awaiter(this, void 0, void 0, function* () { return yield someOtherFunction(i); });
const x1 = (i) => __awaiter(this, void 0, void 0, function* () { return yield someOtherFunction(i); });
