//// [tests/cases/compiler/moduleSameValueDuplicateExportedBindings1.ts] ////

//// [a.ts]
export * from "./b";
export * from "./c";

//// [b.ts]
export * from "./c";

//// [c.ts]
export var foo = 42;

//// [c.js]
"use strict";
exports.__esModule = true;
exports.foo = 42;
//// [b.js]
"use strict";
function __export(m) {
    for (var p in m) b(p);
    function b(p) {
        if (!exports.hasOwnProperty(p)) Object.defineProperty(exports, p, {
            enumerable: true,
            get: function () {
                return m[p];
            }
        });
    }
}
exports.__esModule = true;
__export(require("./c"));
//// [a.js]
"use strict";
function __export(m) {
    for (var p in m) b(p);
    function b(p) {
        if (!exports.hasOwnProperty(p)) Object.defineProperty(exports, p, {
            enumerable: true,
            get: function () {
                return m[p];
            }
        });
    }
}
exports.__esModule = true;
__export(require("./b"));
__export(require("./c"));
