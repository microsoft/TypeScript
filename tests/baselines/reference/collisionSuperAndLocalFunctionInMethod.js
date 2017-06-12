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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function _super() {
}
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.x = function () {
        function _super() {
        }
    };
    proto_1._super = function () {
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
        function _super() {
        }
    };
    proto_2._super = function () {
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
            function _super() {
            }
        };
    };
    proto_3._super = function () {
    };
    return c;
}(Foo));
