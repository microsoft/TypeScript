//// [typeValueConflict2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var M1;
(function (M1) {
    var A = (function () {
        function A(a) {
        }
        return A;
    })();
    M1.A = A;
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    var M1 = 0;

    // Should error.  M1 should bind to the variable, not to the module.
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    })(M1.A);
})(M2 || (M2 = {}));
var M3;
(function (M3) {
    // Shouldn't error
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    })(M1.A);
})(M3 || (M3 = {}));
