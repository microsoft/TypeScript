//// [destructuringInVariableDeclarations7.ts]
export let { toString } = 1;
{
    let { toFixed } = 1;
}


//// [destructuringInVariableDeclarations7.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var toString;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("toString", toString = 1..toString);
            {
                let { toFixed } = 1;
            }
        }
    };
});
