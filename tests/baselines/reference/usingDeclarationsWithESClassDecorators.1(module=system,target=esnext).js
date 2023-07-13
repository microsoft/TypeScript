//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.1.ts] ////

//// [usingDeclarationsWithESClassDecorators.1.ts]
export {};

declare var dec: any;

using before = null;

@dec
class C {
}


//// [usingDeclarationsWithESClassDecorators.1.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var before, C;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            using before_1 = before = null;
            C = 
            @dec
            class C {
            };
        }
    };
});
