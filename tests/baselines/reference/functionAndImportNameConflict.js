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
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() {
}
//// [f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() {
}
