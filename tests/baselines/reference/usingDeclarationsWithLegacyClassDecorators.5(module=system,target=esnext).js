//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.5.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.5.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}

export { C };

//// [usingDeclarationsWithLegacyClassDecorators.5.js]
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
            exports_1("C", C);
            exports_1("C", C = __decorate([
                dec
            ], C));
        }
    };
});
