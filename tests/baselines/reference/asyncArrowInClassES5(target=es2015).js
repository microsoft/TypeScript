//// [tests/cases/compiler/asyncArrowInClassES5.ts] ////

//// [asyncArrowInClassES5.ts]
// https://github.com/Microsoft/TypeScript/issues/16924
// Should capture `this`

class Test {
    static member = async (x: string) => { };
}


//// [asyncArrowInClassES5.js]
"use strict";
// https://github.com/Microsoft/TypeScript/issues/16924
// Should capture `this`
var _a;
class Test {
}
_a = Test;
Test.member = (x) => __awaiter(void 0, void 0, void 0, function* () { });
