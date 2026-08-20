//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction5_es5.ts] ////

//// [asyncArrowFunction5_es5.ts]
var foo = async (await): Promise<void> => {
}

//// [asyncArrowFunction5_es5.js]
"use strict";
var foo = (await) => __awaiter(void 0, void 0, void 0, function* () {
});
