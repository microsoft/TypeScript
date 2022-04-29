//// [systemModule7.ts]
// filename: instantiatedModule.ts
export module M {
    var x = 1;
}

// filename: nonInstantiatedModule.ts
export module M {
    interface I {}
}

//// [systemModule7.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var M;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // filename: instantiatedModule.ts
            (function (M) {
                var x = 1;
            })(M || (M = {}));
            exports_1("M", M);
        }
    };
});
