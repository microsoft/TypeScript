//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.9.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.9.ts]
export {};

declare var dec: any;

@dec
export default class C {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.9.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var C, after;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            C = class C {
            };
            C = __decorate([
                dec
            ], C);
            exports_1("default", C);
            using after_1 = after = null;
        }
    };
});
