//// [tests/cases/compiler/objectNameCollisionCommonJS.ts] ////

//// [objectNameCollisionCommonJS.ts]
let Object = 0;
export const x = 1;


//// [objectNameCollisionCommonJS.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
let Object = 0;
exports.x = 1;
