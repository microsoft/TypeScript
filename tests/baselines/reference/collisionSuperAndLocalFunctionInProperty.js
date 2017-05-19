//// [collisionSuperAndLocalFunctionInProperty.ts]
function _super() { // No error
} 
class Foo {
   public prop1 = {
        doStuff: () => {
            function _super() { // No error
            } 
        }
   }
}
class b extends Foo {
    public prop2 = {
        doStuff: () => {
            function _super() { // error
            } 
        }
    }
}

//// [collisionSuperAndLocalFunctionInProperty.js]
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
        this.prop1 = {
            doStuff: function () {
                function _super() {
                }
            }
        };
    }
    return Foo;
}());
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop2 = {
            doStuff: function () {
                function _super() {
                }
            }
        };
        return _this;
    }
    return b;
}(Foo));
