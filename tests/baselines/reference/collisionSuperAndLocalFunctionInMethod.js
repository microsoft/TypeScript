//// [collisionSuperAndLocalFunctionInMethod.ts]
function _super() { // No error
} 
class Foo {
    x() {
        function _super() { // No error
        } 
    }
    _super() { // No error
    }
}
class b extends Foo {
    public foo() {
        function _super() { // should be error
        } 
    }
    _super() { // No Error
    }
}
class c extends Foo {
    public foo() {
        var x = () => {
            function _super() { // should be error
            } 
        }
    }
    _super() { // No error
    }
}

//// [collisionSuperAndLocalFunctionInMethod.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function _super() {
}
var Foo = /** @class */ (function () {
    function Foo() {
    }
    var Foo_prototype = Foo.prototype;
    Foo_prototype.x = function () {
        function _super() {
        }
    };
    Foo_prototype._super = function () {
    };
    return Foo;
}());
var b = /** @class */ (function (_super_1) {
    __extends(b, _super_1);
    function b() {
        return _super_1 !== null && _super_1.apply(this, arguments) || this;
    }
    var b_prototype = b.prototype;
    b_prototype.foo = function () {
        function _super() {
        }
    };
    b_prototype._super = function () {
    };
    return b;
}(Foo));
var c = /** @class */ (function (_super_1) {
    __extends(c, _super_1);
    function c() {
        return _super_1 !== null && _super_1.apply(this, arguments) || this;
    }
    var c_prototype = c.prototype;
    c_prototype.foo = function () {
        var x = function () {
            function _super() {
            }
        };
    };
    c_prototype._super = function () {
    };
    return c;
}(Foo));
