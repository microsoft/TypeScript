//// [tests/cases/conformance/externalModules/exportClassNameWithObjectSystem.ts] ////

//// [exportClassNameWithObjectSystem.ts]
export class Object {}


//// [exportClassNameWithObjectSystem.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object = void 0;
class Object {
}
exports.Object = Object;
