//// [tests/cases/compiler/asyncArrowInClassES5.ts] ////

//// [asyncArrowInClassES5.ts]
// https://github.com/Microsoft/TypeScript/issues/16924
// Should capture `this`

class Test {
    static member = async (x: string) => { };
}


//// [asyncArrowInClassES5.js]
// https://github.com/Microsoft/TypeScript/issues/16924
// Should capture `this`
var Test = /** @class */ (function () {
    function Test() {
    }
    var _a;
    _a = Test;
    Test.member = function (x) { return __awaiter(_a, void 0, void 0, function () { return __generator(_a, function (_b) {
        return [2 /*return*/];
    }); }); };
    return Test;
}());
