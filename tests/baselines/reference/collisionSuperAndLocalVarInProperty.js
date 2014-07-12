//// [collisionSuperAndLocalVarInProperty.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var _super = 10;
var Foo = (function () {
    function Foo() {
        this.prop1 = {
            doStuff: function () {
                var _super = 10;
            }
        };
        this._super = 10;
    }
    return Foo;
})();
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
        this.prop2 = {
            doStuff: function () {
                var _super = 10;
            }
        };
        this._super = 10;
    }
    return b;
})(Foo);
