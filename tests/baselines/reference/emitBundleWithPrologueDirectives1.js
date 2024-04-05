//// [tests/cases/compiler/emitBundleWithPrologueDirectives1.ts] ////

//// [test.ts]
/* Detached Comment */

// Class Doo Comment
export class Doo {}
class Scooby extends Doo {}

//// [outFile.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* Detached Comment */
define("test", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Doo = void 0;
    // Class Doo Comment
    var Doo = /** @class */ (function () {
        function Doo() {
        }
        return Doo;
    }());
    exports.Doo = Doo;
    var Scooby = /** @class */ (function (_super) {
        __extends(Scooby, _super);
        function Scooby() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Scooby;
    }(Doo));
});
