//// [tests/cases/compiler/collisionSuperAndLocalFunctionInAccessors.ts] ////

//// [collisionSuperAndLocalFunctionInAccessors.ts]
function _super() { // No error
}
class Foo {
    get prop1(): number {
        function _super() { // No error
        }
        return 10;
    }
    set prop1(val: number) {
        function _super() { // No error
        }
    }
}
class b extends Foo {
    get prop2(): number {
        function _super() { // Should be error
        }
        return 10;
    }
    set prop2(val: number) {
        function _super() { // Should be error
        }
    }
}
class c extends Foo {
    get prop2(): number {
        var x = () => {
            function _super() { // Should be error
            }
        }
        return 10;
    }
    set prop2(val: number) {
        var x = () => {
            function _super() { // Should be error
            }
        }
    }
}

//// [collisionSuperAndLocalFunctionInAccessors.js]
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
    }
    Object.defineProperty(Foo.prototype, "prop1", {
        get: function () {
            function _super() {
            }
            return 10;
        },
        set: function (val) {
            function _super() {
            }
        },
        enumerable: false,
        configurable: true
    });
    return Foo;
}());
var b = /** @class */ (function (_super_1) {
    __extends(b, _super_1);
    function b() {
        return _super_1 !== null && _super_1.apply(this, arguments) || this;
    }
    Object.defineProperty(b.prototype, "prop2", {
        get: function () {
            function _super() {
            }
            return 10;
        },
        set: function (val) {
            function _super() {
            }
        },
        enumerable: false,
        configurable: true
    });
    return b;
}(Foo));
var c = /** @class */ (function (_super_1) {
    __extends(c, _super_1);
    function c() {
        return _super_1 !== null && _super_1.apply(this, arguments) || this;
    }
    Object.defineProperty(c.prototype, "prop2", {
        get: function () {
            var x = function () {
                function _super() {
                }
            };
            return 10;
        },
        set: function (val) {
            var x = function () {
                function _super() {
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    return c;
}(Foo));
