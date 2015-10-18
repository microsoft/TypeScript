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
    var T = (function () {
        function T() {
        }
        return T;
    })();
    return T;
});
//// [exportAssignmentOfGenericType1_1.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "exportAssignmentOfGenericType1_0"], function (require, exports, q) {
    var M = (function (_super) {
        __extends(M, _super);
        function M() {
            _super.apply(this, arguments);
        }
        return M;
    })(q);
    var m;
    var r = m.foo;
});
