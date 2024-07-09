//// [tests/cases/compiler/voidAsNonAmbiguousReturnType.ts] ////

//// [voidAsNonAmbiguousReturnType_0.ts]
export function mkdirSync(path: string, mode?: number): void;
export function mkdirSync(path: string, mode?: string): void {}

//// [voidAsNonAmbiguousReturnType_1.ts]
///<reference path='voidAsNonAmbiguousReturnType_0.ts'/>
import fs = require("./voidAsNonAmbiguousReturnType_0");

function main() {
 fs.mkdirSync('test'); // should not error - return types are the same
}


//// [voidAsNonAmbiguousReturnType_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkdirSync = mkdirSync;
function mkdirSync(path, mode) { }
//// [voidAsNonAmbiguousReturnType_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='voidAsNonAmbiguousReturnType_0.ts'/>
var fs = require("./voidAsNonAmbiguousReturnType_0");
function main() {
    fs.mkdirSync('test'); // should not error - return types are the same
}
