//// [asyncArrowInClassES5.ts]
// https://github.com/Microsoft/TypeScript/issues/16924
// Should capture `this`

class Test {
    static member = async (x: string) => { };
}


//// [asyncArrowInClassES5.js]
// https://github.com/Microsoft/TypeScript/issues/16924
// Should capture `this`
var _this = this;
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.member = function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); };
    return Test;
}());
