//// [tests/cases/compiler/baseClassOutOfOrderFromExternalModule.ts] ////

//// [mod2.ts]
export default class D {
}

//// [file1.ts]
import C from "mod";
import D from "mod2";
class B extends C { // no error here
}
class A extends D { // no error here
}

//// [mod.ts]
export default class C {
}


//// [mod2.js]
var D = (function () {
    function D() {
    }
    return D;
})();
exports.__esModule = true;
exports["default"] = D;
//// [mod.js]
var C = (function () {
    function C() {
    }
    return C;
})();
exports.__esModule = true;
exports["default"] = C;
//// [file1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mod_1 = require("mod");
var mod2_1 = require("mod2");
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(mod_1["default"]);
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        _super.apply(this, arguments);
    }
    return A;
})(mod2_1["default"]);
