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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function _super() { // No error
}
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.x = function () {
        function _super() { // No error
        }
    };
    Foo.prototype._super = function () { // No error
    };
    return Foo;
}());
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    b.prototype.foo = function () {
        function _super() { // should be error
        }
    };
    b.prototype._super = function () { // No Error
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
            function _super() { // should be error
            }
        };
    };
    c.prototype._super = function () { // No error
    };
    return c;
}(Foo));
