//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncArrowFunction6_es6.ts] ////

//// [asyncArrowFunction6_es6.ts]
var foo = async (a = await): Promise<void> => {
}

//// [asyncArrowFunction6_es6.js]
"use strict";
var foo = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (a = yield ) {
});
