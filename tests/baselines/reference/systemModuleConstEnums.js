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
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function foo() {
        use(0 /* TopLevelConstEnum.X */);
        use(0 /* M.NonTopLevelConstEnum.X */);
    }
    exports_1("foo", foo);
    return {
        setters: [],
        execute: function () {
        }
    };
});
