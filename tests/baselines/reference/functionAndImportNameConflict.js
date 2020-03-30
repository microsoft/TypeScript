//// [tests/cases/compiler/functionAndImportNameConflict.ts] ////

//// [f1.ts]
export function f() {
}

//// [f2.ts]
import {f} from './f1';
export function f() {
}

//// [f1.js]
"use strict";
exports.__esModule = true;
exports.f = void 0;
function f() {
}
exports.f = f;
//// [f2.js]
"use strict";
exports.__esModule = true;
exports.f = void 0;
function f() {
}
exports.f = f;
