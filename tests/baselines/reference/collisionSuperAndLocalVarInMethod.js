//// [collisionSuperAndLocalVarInMethod.ts]
var _super = 10; // No Error
class Foo {
    x() {
        var _super = 10; // No error
    }
}
class b extends Foo {
    public foo() {
        var _super = 10; // Should be error 
    }
}
class c extends Foo {
    public foo() {
        var x = () => {
            var _super = 10; // Should be error
        }
    }
}

//// [collisionSuperAndLocalVarInMethod.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _super = 10; // No Error
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.x = function () {
        var _super = 10; // No error
    };
    return Foo;
}());
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    b.prototype.foo = function () {
        var _super = 10; // Should be error 
    };
    return b;
}(Foo));
var c = (function (_super) {
    __extends(c, _super);
    function c() {
        _super.apply(this, arguments);
    }
    c.prototype.foo = function () {
        var x = function () {
            var _super = 10; // Should be error
        };
    };
    return c;
}(Foo));
