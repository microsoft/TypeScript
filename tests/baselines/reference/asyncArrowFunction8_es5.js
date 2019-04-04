//// [asyncArrowFunction8_es5.ts]
var foo = async (): Promise<void> => {
  var v = { [await]: foo }
}

//// [asyncArrowFunction8_es5.js]
var _this = this;
var foo = function () { return __awaiter(_this, void 0, void 0, function () {
    var v;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, ];
            case 1:
                v = (_a[_b.sent()] = foo, _a);
                return [2 /*return*/];
        }
    });
}); };
