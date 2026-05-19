//// [tests/cases/compiler/exportObjectRest.ts] ////

//// [exportObjectRest.ts]
export const { x, ...rest } = { x: 'x', y: 'y' };

//// [exportObjectRest.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rest = exports.x = void 0;
({ x: exports.x, ...exports.rest } = { x: 'x', y: 'y' });
