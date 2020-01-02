//// [topLevelAwait.ts]
export const x = 1;
await x;


//// [topLevelAwait.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var x;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: async function () {
            exports_1("x", x = 1);
            await x;
        }
    };
});
