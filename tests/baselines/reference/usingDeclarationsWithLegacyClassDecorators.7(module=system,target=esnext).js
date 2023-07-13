//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.7.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.7.ts]
export {};

declare var dec: any;

@dec
class C {
}

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.7.js]
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
            using after_1 = after = null;
        }
    };
});
