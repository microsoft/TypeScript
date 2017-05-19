//// [collisionSuperAndLocalVarInAccessors.ts]
var _super = 10; // No Error
class Foo {
    get prop1(): number {
        var _super = 10; // No error
        return 10;
    }
    set prop1(val: number) {
        var _super = 10; // No error
    }
}
class b extends Foo {
    get prop2(): number {
        var _super = 10; // Should be error
        return 10;
    }
    set prop2(val: number) {
        var _super = 10; // Should be error
    }
}
class c extends Foo {
    get prop2(): number {
        var x = () => {
            var _super = 10; // Should be error
        }
        return 10;
    }
    set prop2(val: number) {
        var x = () => {
            var _super = 10; // Should be error
        }
    }
}

//// [collisionSuperAndLocalVarInAccessors.js]
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
    Object.defineProperty(Foo.prototype, "prop1", {
        get: function () {
            var _super = 10; // No error
            return 10;
        },
        set: function (val) {
            var _super = 10; // No error
        },
        enumerable: true,
        configurable: true
    });
    return Foo;
}());
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(b.prototype, "prop2", {
        get: function () {
            var _super = 10; // Should be error
            return 10;
        },
        set: function (val) {
            var _super = 10; // Should be error
        },
        enumerable: true,
        configurable: true
    });
    return b;
}(Foo));
var c = (function (_super) {
    __extends(c, _super);
    function c() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(c.prototype, "prop2", {
        get: function () {
            var x = function () {
                var _super = 10; // Should be error
            };
            return 10;
        },
        set: function (val) {
            var x = function () {
                var _super = 10; // Should be error
            };
        },
        enumerable: true,
        configurable: true
    });
    return c;
}(Foo));
