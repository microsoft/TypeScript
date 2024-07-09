//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction1_es5.ts] ////

//// [asyncArrowFunction1_es5.ts]
var foo = async (): Promise<void> => {
};

//// [asyncArrowFunction1_es5.js]
var _this = this;
var foo = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
