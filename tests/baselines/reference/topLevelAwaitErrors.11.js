//// [tests/cases/conformance/externalModules/topLevelAwaitErrors.11.ts] ////

//// [index.ts]
// await disallowed in import=
declare var require: any;
import await = require("./other");

//// [other.ts]
declare const _await: any;
export { _await as await };


//// [other.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [index.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
