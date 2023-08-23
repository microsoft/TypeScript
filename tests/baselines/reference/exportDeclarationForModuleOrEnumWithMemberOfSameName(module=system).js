//// [tests/cases/compiler/exportDeclarationForModuleOrEnumWithMemberOfSameName.ts] ////

//// [exportDeclarationForModuleOrEnumWithMemberOfSameName.ts]
// https://github.com/microsoft/TypeScript/issues/55038

namespace A {
    export const A = 0;
}

export { A }

enum B {
    B
}

export { B }


//// [exportDeclarationForModuleOrEnumWithMemberOfSameName.js]
// https://github.com/microsoft/TypeScript/issues/55038
System.register([], function (exports_1, context_1) {
    "use strict";
    var A, B;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {// https://github.com/microsoft/TypeScript/issues/55038
            (function (A_1) {
                A_1.A = 0;
            })(A || (exports_1("A", A = {})));
            (function (B) {
                B[B["B"] = 0] = "B";
            })(B || (exports_1("B", B = {})));
        }
    };
});
