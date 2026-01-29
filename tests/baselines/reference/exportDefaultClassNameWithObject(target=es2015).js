//// [tests/cases/conformance/externalModules/exportDefaultClassNameWithObject.ts] ////

//// [exportDefaultClassNameWithObject.ts]
export default class Object {}


//// [exportDefaultClassNameWithObject.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Object {
}
exports.default = Object;
