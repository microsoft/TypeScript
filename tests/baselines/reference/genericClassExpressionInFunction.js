//// [tests/cases/conformance/classes/classExpressions/genericClassExpressionInFunction.ts] ////

//// [genericClassExpressionInFunction.ts]
class A<T> {
    genericVar: T
}
function B1<U>() {
    // class expression can use T
    return class extends A<U> { }
}
class B2<V> {
    anon = class extends A<V> { }
}
function B3<W>() {
    return class Inner<TInner> extends A<W> { }
}
// extends can call B
class K extends B1<number>() {
    namae: string;
}
class C extends (new B2<number>().anon) {
    name: string;
}
let b3Number = B3<number>();
class S extends b3Number<string> {
    nom: string;
}
var c = new C();
var k = new K();
var s = new S();
c.genericVar = 12;
k.genericVar = 12;
s.genericVar = 12;


//// [genericClassExpressionInFunction.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
function B1() {
    // class expression can use T
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class_1;
    }(A));
}
var B2 = /** @class */ (function () {
    function B2() {
        this.anon = /** @class */ (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return class_2;
        }(A));
    }
    return B2;
}());
function B3() {
    return /** @class */ (function (_super) {
        __extends(Inner, _super);
        function Inner() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Inner;
    }(A));
}
// extends can call B
var K = /** @class */ (function (_super) {
    __extends(K, _super);
    function K() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return K;
}(B1()));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}((new B2().anon)));
var b3Number = B3();
var S = /** @class */ (function (_super) {
    __extends(S, _super);
    function S() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return S;
}(b3Number));
var c = new C();
var k = new K();
var s = new S();
c.genericVar = 12;
k.genericVar = 12;
s.genericVar = 12;
