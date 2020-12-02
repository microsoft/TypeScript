//// [indexerConstraints2.ts]
class A { a: number; }
class B extends A { b: number; }

// Inheritance
class F {
    [s: string]: B
}
class G extends F {
    [n: number]: A
}

// Other way
class H {
    [n: number]: A
}
class I extends H {
    [s: string]: B
}

// With hidden indexer
class J {
    [n: number]: {}
}

class K extends J {
    [n: number]: A;
    [s: string]: B;
}


type AliasedNumber = number;

interface L {
    [n: AliasedNumber]: A;
}

type AliasedString = string;

interface M {
    [s: AliasedString]: A;
}

type AliasedBoolean = boolean;

interface N {
    [b: AliasedBoolean]: A;
}

type IndexableUnion = "foo" | "bar";

interface O {
    [u: IndexableUnion]: A;
}

type NonIndexableUnion = boolean | {};

interface P {
    [u: NonIndexableUnion]: A;
}

type NonIndexableUnion2 = string | number;

interface Q {
    [u: NonIndexableUnion2]: A;
}

type NonIndexableUnion3 = "foo" | 42;

interface R {
    [u: NonIndexableUnion3]: A;
}

interface S {
    [u: "foo" | "bar"]: A;
}

type Key = string;
interface T {
    [key: Key]
}


//// [indexerConstraints2.js]
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
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
// Inheritance
var F = /** @class */ (function () {
    function F() {
    }
    return F;
}());
var G = /** @class */ (function (_super) {
    __extends(G, _super);
    function G() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return G;
}(F));
// Other way
var H = /** @class */ (function () {
    function H() {
    }
    return H;
}());
var I = /** @class */ (function (_super) {
    __extends(I, _super);
    function I() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return I;
}(H));
// With hidden indexer
var J = /** @class */ (function () {
    function J() {
    }
    return J;
}());
var K = /** @class */ (function (_super) {
    __extends(K, _super);
    function K() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return K;
}(J));
