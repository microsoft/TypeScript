//// [collisionSuperAndLocalVarInConstructor.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var _super = 10;
var Foo = (function () {
    function Foo() {
        var _super = 10;
    }
    return Foo;
})();
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.call(this);
        var _super = 10;
    }
    return b;
})(Foo);
var c = (function (_super) {
    __extends(c, _super);
    function c() {
        _super.call(this);
        var x = function () {
            var _super = 10;
        };
    }
    return c;
})(Foo);
