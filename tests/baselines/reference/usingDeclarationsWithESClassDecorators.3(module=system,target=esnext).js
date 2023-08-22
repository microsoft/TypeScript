//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.3.ts] ////

//// [usingDeclarationsWithESClassDecorators.3.ts]
export {};

declare var dec: any;

using before = null;

@dec
export default class C {
}

void C;

//// [usingDeclarationsWithESClassDecorators.3.js]
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
            exports_1("default", C);
            void C;
        }
    };
});
