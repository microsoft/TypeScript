//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithLegacyClassDecorators.12.ts] ////

//// [usingDeclarationsWithLegacyClassDecorators.12.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C as D };

using after = null;


//// [usingDeclarationsWithLegacyClassDecorators.12.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var C, after;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            C = class C {
            };
            exports_1("D", C);
            exports_1("D", C = __decorate([
                dec
            ], C));
            using after_1 = after = null;
        }
    };
});
