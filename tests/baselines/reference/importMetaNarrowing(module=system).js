//// [tests/cases/conformance/es2019/importMeta/importMetaNarrowing.ts] ////

//// [importMetaNarrowing.ts]
declare global { interface ImportMeta {foo?: () => void} };

if (import.meta.foo) {
  import.meta.foo();
}


//// [importMetaNarrowing.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ;
            if (context_1.meta.foo) {
                context_1.meta.foo();
            }
        }
    };
});
