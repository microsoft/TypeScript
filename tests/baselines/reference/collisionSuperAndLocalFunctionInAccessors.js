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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function _super() {
}
var Foo = (function () {
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
        enumerable: true,
        configurable: true
    });
    return Foo;
}());
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
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
        enumerable: true,
        configurable: true
    });
    return b;
}(Foo));
var c = (function (_super) {
    __extends(c, _super);
    function c() {
        _super.apply(this, arguments);
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
        enumerable: true,
        configurable: true
    });
    return c;
}(Foo));
