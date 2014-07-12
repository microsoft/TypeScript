//// [checkForObjectTooStrict.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Foo;
(function (Foo) {
    var Object = (function () {
        function Object() {
        }
        return Object;
    })();
    Foo.Object = Object;
})(Foo || (Foo = {}));

var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.call(this);
    }
    return Bar;
})(Foo.Object);

var Baz = (function (_super) {
    __extends(Baz, _super);
    function Baz() {
        _super.call(this);
    }
    return Baz;
})(Object);
