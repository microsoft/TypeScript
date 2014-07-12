//// [superCallArgsMustMatch.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var T5 = (function () {
    function T5(bar) {
        this.bar = bar;
    }
    return T5;
})();

var T6 = (function (_super) {
    __extends(T6, _super);
    function T6() {
        _super.call(this, "hi"); // Should error, base constructor has type T for first arg, which is fixed as number in the extends clause

        var x = this.foo;
    }
    return T6;
})(T5);
