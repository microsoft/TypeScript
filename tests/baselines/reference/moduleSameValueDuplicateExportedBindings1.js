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
exports.foo = 42;
exports.__esModule = true;
//// [b.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./c"));
exports.__esModule = true;
//// [a.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./b"));
__export(require("./c"));
exports.__esModule = true;
