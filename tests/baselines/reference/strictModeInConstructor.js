//// [strictModeInConstructor.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    return A;
})();

var B = (function (_super) {
    __extends(B, _super);
    function B() {
        "use strict"; // No error
        this.s = 9;
        _super.call(this);
    }
    return B;
})(A);

var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.call(this); // No error
        this.s = 9;
        "use strict";
    }
    return C;
})(A);

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var x = 1;
        this.s = 9;
        _super.call(this);
        "use strict";
    }
    return D;
})(A);

var Bs = (function (_super) {
    __extends(Bs, _super);
    function Bs() {
        "use strict"; // No error
        _super.call(this);
    }
    Bs.s = 9;
    return Bs;
})(A);

var Cs = (function (_super) {
    __extends(Cs, _super);
    function Cs() {
        _super.call(this); // No error
        "use strict";
    }
    Cs.s = 9;
    return Cs;
})(A);

var Ds = (function (_super) {
    __extends(Ds, _super);
    function Ds() {
        var x = 1;
        _super.call(this);
        "use strict";
    }
    Ds.s = 9;
    return Ds;
})(A);
