//// [tests/cases/compiler/systemModuleConstEnumsSeparateCompilation.ts] ////

//// [systemModuleConstEnumsSeparateCompilation.ts]
declare function use(a: any);
const enum TopLevelConstEnum { X }

export function foo() {
    use(TopLevelConstEnum.X);
    use(M.NonTopLevelConstEnum.X);
}

module M {
    export const enum NonTopLevelConstEnum { X }
}

//// [systemModuleConstEnumsSeparateCompilation.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
var TopLevelConstEnum;
(function (TopLevelConstEnum) {
    TopLevelConstEnum[TopLevelConstEnum["X"] = 0] = "X";
})(TopLevelConstEnum || (TopLevelConstEnum = {}));
function foo() {
    use(TopLevelConstEnum.X);
    use(M.NonTopLevelConstEnum.X);
}
var M;
(function (M) {
    let NonTopLevelConstEnum;
    (function (NonTopLevelConstEnum) {
        NonTopLevelConstEnum[NonTopLevelConstEnum["X"] = 0] = "X";
    })(NonTopLevelConstEnum = M.NonTopLevelConstEnum || (M.NonTopLevelConstEnum = {}));
})(M || (M = {}));
