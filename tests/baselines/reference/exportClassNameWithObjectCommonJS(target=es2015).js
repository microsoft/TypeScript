//// [tests/cases/conformance/externalModules/exportClassNameWithObjectCommonJS.ts] ////

//// [exportClassNameWithObjectCommonJS.ts]
export class Object {}


//// [exportClassNameWithObjectCommonJS.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object = void 0;
class Object {
}
exports.Object = Object;
