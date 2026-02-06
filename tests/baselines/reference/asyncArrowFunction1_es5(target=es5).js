//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction1_es5.ts] ////

//// [asyncArrowFunction1_es5.ts]
var foo = async (): Promise<void> => {
};

//// [asyncArrowFunction1_es5.js]
"use strict";
var foo = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
