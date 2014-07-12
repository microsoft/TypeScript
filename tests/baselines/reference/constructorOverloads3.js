//// [constructorOverloads3.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo(x, y) {
    }
    Foo.prototype.bar1 = function () {
    };
    return Foo;
})(FooBase);

var f1 = new Foo("hey");
var f2 = new Foo(0);
var f3 = new Foo(f1);
var f4 = new Foo([f1, f2, f3]);

f1.bar1();
