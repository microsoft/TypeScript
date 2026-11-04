//// [tests/cases/compiler/namespaceFunctionReservedDefaultParameter.ts] ////

//// [namespaceFunctionReservedDefaultParameter.ts]
namespace Dependencies {
    export function scripts(static = false) {
        if (static) {
            return "static.js";
        }
        return "interactive.js";
    }
}


//// [namespaceFunctionReservedDefaultParameter.js]
"use strict";
var Dependencies;
(function (Dependencies) {
    function scripts(static = false) {
        if (static) {
            return "static.js";
        }
        return "interactive.js";
    }
    Dependencies.scripts = scripts;
})(Dependencies || (Dependencies = {}));
