//// [pipelineOperatorWithAsyncArrowFunctions.ts]
function then<T, R>(fn: (value: T) => R) {
  return async (value: Promise<T>): Promise<R> => {
    return fn(await value);
  };
}

var res = 1
  |> (async (x: number) => await x + 1)
  |> then((x: number) => x + 1);


//// [pipelineOperatorWithAsyncArrowFunctions.js]
var _this = this;
function then(fn) {
    var _this = this;
    return function (value) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = fn;
                    return [4 /*yield*/, value];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
            }
        });
    }); };
}
var res = (_ref_1 = (_ref_2 = 1, (function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, x];
        case 1: return [2 /*return*/, (_a.sent()) + 1];
    }
}); }); })(_ref_2)), then(function (x) { return x + 1; })(_ref_1));
var _ref_1, _ref_2;
