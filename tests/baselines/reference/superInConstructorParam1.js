//// [superInConstructorParam1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var B = (function () {
    function B() {
    }
    B.prototype.foo = function () {
        return 0;
    };
    return B;
})();

var C = (function (_super) {
    __extends(C, _super);
    function C(a) {
        if (typeof a === "undefined") { a = _super.prototype.foo.call(this); }
    }
    return C;
})(B);
