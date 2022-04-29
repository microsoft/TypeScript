//// [SystemModuleForStatementNoInitializer.ts]
export { };

let i = 0;
let limit = 10;

for (; i < limit; ++i) {
    break;
}

for (; ; ++i) {
    break;
}

for (; ;) {
    break;
}


//// [SystemModuleForStatementNoInitializer.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var i, limit;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            i = 0;
            limit = 10;
            for (; i < limit; ++i) {
                break;
            }
            for (;; ++i) {
                break;
            }
            for (;;) {
                break;
            }
        }
    };
});
