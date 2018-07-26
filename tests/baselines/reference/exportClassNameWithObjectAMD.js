//// [exportClassNameWithObjectAMD.ts]
export class Object {}


//// [exportClassNameWithObjectAMD.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Object = /** @class */ (function () {
        function Object() {
        }
        return Object;
    }());
    exports.Object = Object;
});
