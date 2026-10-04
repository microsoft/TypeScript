//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncUnParenthesizedArrowFunction_es5.ts] ////

//// [asyncUnParenthesizedArrowFunction_es5.ts]
declare function someOtherFunction(i: any): Promise<void>;
const x = async i => await someOtherFunction(i)
const x1 = async (i) => await someOtherFunction(i);

//// [asyncUnParenthesizedArrowFunction_es5.js]
"use strict";
const x = (i) => __awaiter(void 0, void 0, void 0, function* () { return yield someOtherFunction(i); });
const x1 = (i) => __awaiter(void 0, void 0, void 0, function* () { return yield someOtherFunction(i); });
