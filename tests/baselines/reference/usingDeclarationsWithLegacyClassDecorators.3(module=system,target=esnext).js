//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.3.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.3.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class C {
}


//// [usingDeclarationsWithLegacyClassDecorators.3.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var before, C;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            using before_1 = before = null;
            C = class C {
            };
            C = __decorate([
                dec
            ], C);
            exports_1("default", C);
        }
    };
});
