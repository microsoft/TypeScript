//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction7_es5.ts] ////

//// [asyncArrowFunction7_es5.ts]
var bar = async (): Promise<void> => {
  // 'await' here is an identifier, and not an await expression.
  var foo = async (a = await): Promise<void> => {
  }
}

//// [asyncArrowFunction7_es5.js]
var _this = this;
var bar = function () { return __awaiter(_this, void 0, void 0, function () {
    var foo;
    var _this = this;
    return __generator(this, function (_a) {
        foo = function () {
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
        return [2 /*return*/];
    });
}); };
