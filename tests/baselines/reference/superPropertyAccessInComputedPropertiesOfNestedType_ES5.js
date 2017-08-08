//// [superPropertyAccessInComputedPropertiesOfNestedType_ES5.ts]
class A {
    foo() { return 1; }
}

class B extends A {
    foo() { return 2; }
    bar() {
        return class {
            [super.foo()]() {
                return 100;
            }
        }
    }
}

//// [superPropertyAccessInComputedPropertiesOfNestedType_ES5.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () { return 1; };
    __names(A.prototype, ["foo"]);
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.foo = function () { return 2; };
    B.prototype.bar = function () {
        return (function () {
            function class_1() {
            }
            class_1.prototype[_a = _super.prototype.foo.call(this)] = function () {
                return 100;
            };
            __names(class_1.prototype, [_a]);
            return class_1;
            var _a;
        }());
    };
    __names(B.prototype, ["foo", "bar"]);
    return B;
}(A));
