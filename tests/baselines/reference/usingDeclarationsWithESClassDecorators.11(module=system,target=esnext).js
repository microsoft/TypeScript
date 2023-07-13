//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.11.ts] ////

//// [usingDeclarationsWithESClassDecorators.11.ts]
export {};

declare var dec: any;

@dec
class C {
}

export { C };

using after = null;


//// [usingDeclarationsWithESClassDecorators.11.js]
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
            exports_1("C", C);
            using after_1 = after = null;
        }
    };
});
