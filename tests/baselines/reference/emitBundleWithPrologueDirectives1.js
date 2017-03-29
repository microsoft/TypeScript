//// [test.ts]
/* Detached Comment */

// Class Doo Comment
export class Doo {}
class Scooby extends Doo {}

//// [outFile.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* Detached Comment */
define("test", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Class Doo Comment
    var Doo = (function () {
        function Doo() {
        }
        return Doo;
    }());
    exports.Doo = Doo;
    var Scooby = (function (_super) {
        __extends(Scooby, _super);
        function Scooby() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Scooby;
    }(Doo));
});
