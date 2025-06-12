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
let Test = (() => {
    var _a;
    class Test {
    }
    _a = Test;
    Test.member = (x) => __awaiter(_a, void 0, void 0, function* () { });
    return Test;
})();
