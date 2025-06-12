//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncUnParenthesizedArrowFunction_es5.ts] ////

//// [asyncUnParenthesizedArrowFunction_es5.ts]
declare function someOtherFunction(i: any): Promise<void>;
const x = async i => await someOtherFunction(i)
const x1 = async (i) => await someOtherFunction(i);

//// [asyncUnParenthesizedArrowFunction_es5.js]
const x = (i) => __awaiter(this, void 0, void 0, function* () { return yield someOtherFunction(i); });
const x1 = (i) => __awaiter(this, void 0, void 0, function* () { return yield someOtherFunction(i); });
