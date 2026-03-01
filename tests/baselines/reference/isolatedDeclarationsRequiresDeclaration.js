//// [tests/cases/compiler/isolatedDeclarationsRequiresDeclaration.ts] ////

//// [file1.ts]
export var x = 1;
//// [file2.ts]
export var y = 1;

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 1;
