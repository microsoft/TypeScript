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
System.register([], function(exports_1) {
    "use strict";
    function foo() {
        use(0 /* X */);
        use(0 /* X */);
    }
    exports_1("foo", foo);
    return {
        setters:[],
        execute: function() {
        }
    }
});
