//// [tests/cases/conformance/externalModules/exportClassNameWithObjectUMD.ts] ////

//// [exportClassNameWithObjectUMD.ts]
export class Object {}


//// [exportClassNameWithObjectUMD.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object = void 0;
class Object {
}
exports.Object = Object;
