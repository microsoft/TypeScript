//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.12.ts] ////

//// [usingDeclarationsWithESClassDecorators.12.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C as D };

using after = null;


//// [usingDeclarationsWithESClassDecorators.12.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var C, after;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            C = 
            @dec
            class C {
            };
            exports_1("D", C);
            using after_1 = after = null;
        }
    };
});
