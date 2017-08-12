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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _super = 10; // No Error
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.x = function () {
        var _super = 10; // No error
    };
    return Foo;
}());
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var proto_2 = b.prototype;
    proto_2.foo = function () {
        var _super = 10; // Should be error 
    };
    return b;
}(Foo));
var c = (function (_super) {
    __extends(c, _super);
    function c() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var proto_3 = c.prototype;
    proto_3.foo = function () {
        var x = function () {
            var _super = 10; // Should be error
        };
    };
    return c;
}(Foo));
