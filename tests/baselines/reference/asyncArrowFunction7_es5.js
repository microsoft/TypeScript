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
        foo = function (a) {
            if (a === void 0) { a = yield ; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        return [2 /*return*/];
    });
}); };
