//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction5_es5.ts] ////

//// [asyncArrowFunction5_es5.ts]
var foo = async (await): Promise<void> => {
}

//// [asyncArrowFunction5_es5.js]
var _this = this;
var foo = function (await) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
