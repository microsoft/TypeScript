//// [collisionSuperAndLocalFunctionInConstructor.ts]
function _super() { // No error
}
class Foo {
    constructor() {
        function _super() { // No error
        }
    }
}
class b extends Foo {
    constructor() {
        super();
        function _super() { // Should be error
        }
    }
}
class c extends Foo {
    constructor() {
        super();
        var x = () => {
            function _super() { // Should be error
            }
        }
    }
}

//// [collisionSuperAndLocalFunctionInConstructor.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function _super() {
}
var Foo = /** @class */ (function () {
    function Foo() {
        function _super() {
        }
    }
    return Foo;
}());
var b = /** @class */ (function (_super_1) {
    __extends(b, _super_1);
    function b() {
        var _this = _super_1.call(this) || this;
        function _super() {
        }
        return _this;
    }
    return b;
}(Foo));
var c = /** @class */ (function (_super_1) {
    __extends(c, _super_1);
    function c() {
        var _this = _super_1.call(this) || this;
        var x = function () {
            function _super() {
            }
        };
        return _this;
    }
    return c;
}(Foo));
