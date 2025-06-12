//// [tests/cases/conformance/externalModules/exportClassNameWithObjectAMD.ts] ////

//// [exportClassNameWithObjectAMD.ts]
export class Object {}


//// [exportClassNameWithObjectAMD.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Object = void 0;
    class Object {
    }
    exports.Object = Object;
});
