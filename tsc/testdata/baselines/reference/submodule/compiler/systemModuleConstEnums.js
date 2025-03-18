//// [tests/cases/compiler/systemModuleConstEnums.ts] ////

//// [systemModuleConstEnums.ts]
declare function use(a: any);
const enum TopLevelConstEnum { X }

export function foo() {
    use(TopLevelConstEnum.X);
    use(M.NonTopLevelConstEnum.X);
}

module M {
    export const enum NonTopLevelConstEnum { X }
}

//// [systemModuleConstEnums.js]
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
