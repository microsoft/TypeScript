//// [tests/cases/compiler/isolatedDeclarationsOutOption.ts] ////

//// [file1.ts]
export var x;
//// [file2.ts]
export var y;

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
