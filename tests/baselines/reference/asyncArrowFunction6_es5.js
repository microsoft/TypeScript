//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction6_es5.ts] ////

//// [asyncArrowFunction6_es5.ts]
var foo = async (a = await): Promise<void> => {
}

//// [asyncArrowFunction6_es5.js]
var _this = this;
var foo = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (a) {
        if (a === void 0) { a = _a.sent(); }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ];
                case 1: return [2 /*return*/];
            }
        });
    });
};
