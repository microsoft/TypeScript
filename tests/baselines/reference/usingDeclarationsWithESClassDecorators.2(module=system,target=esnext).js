//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.2.ts] ////

//// [usingDeclarationsWithESClassDecorators.2.ts]
export {};

declare var dec: any;

using before = null;

@dec
export class C {
}


//// [usingDeclarationsWithESClassDecorators.2.js]
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
            exports_1("C", C);
        }
    };
});
