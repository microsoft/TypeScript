//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.7.ts] ////

//// [usingDeclarationsWithESClassDecorators.7.ts]
export {};

declare var dec: any;

@dec
class C {
}

using after = null;



//// [usingDeclarationsWithESClassDecorators.7.js]
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
            using after_1 = after = null;
        }
    };
});
