//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsWithESClassDecorators.10.ts] ////

//// [usingDeclarationsWithESClassDecorators.10.ts]
export {};

declare var dec: any;

@dec
export default class {
}

using after = null;


//// [usingDeclarationsWithESClassDecorators.10.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var default_1, after;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            default_1 = 
            @dec
            class {
            };
            exports_1("default", default_1);
            using after_1 = after = null;
        }
    };
});
