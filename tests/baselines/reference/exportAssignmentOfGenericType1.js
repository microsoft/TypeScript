//// [tests/cases/compiler/exportAssignmentOfGenericType1.ts] ////

//// [exportAssignmentOfGenericType1_0.ts]
export = T;
class T<X> { foo: X; }

//// [exportAssignmentOfGenericType1_1.ts]
///<reference path='exportAssignmentOfGenericType1_0.ts'/>
import q = require("exportAssignmentOfGenericType1_0");

class M extends q<string> { }
var m: M;
var r: string = m.foo;


//// [exportAssignmentOfGenericType1_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var T = /** @class */ (function () {
        function T() {
        }
        return T;
    }());
    return T;
});
//// [exportAssignmentOfGenericType1_1.js]
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
define(["require", "exports", "exportAssignmentOfGenericType1_0"], function (require, exports, q) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var M = /** @class */ (function (_super) {
        __extends(M, _super);
        function M() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return M;
    }(q));
    var m;
    var r = m.foo;
});
