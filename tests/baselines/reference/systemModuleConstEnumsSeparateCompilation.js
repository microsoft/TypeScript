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
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() {
        use(TopLevelConstEnum.X);
        use(M.NonTopLevelConstEnum.X);
    }
    var TopLevelConstEnum, M;
    exports_1("foo", foo);
    return {
        setters: [],
        execute: function () {
            (function (TopLevelConstEnum) {
                TopLevelConstEnum[TopLevelConstEnum["X"] = 0] = "X";
            })(TopLevelConstEnum || (TopLevelConstEnum = {}));
            (function (M) {
                (function (NonTopLevelConstEnum) {
                    NonTopLevelConstEnum[NonTopLevelConstEnum["X"] = 0] = "X";
                })(M.NonTopLevelConstEnum || (M.NonTopLevelConstEnum = {}));
                var NonTopLevelConstEnum = M.NonTopLevelConstEnum;
            })(M || (M = {}));
        }
    };
});
