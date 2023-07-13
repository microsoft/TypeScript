//// [tests/cases/conformance/classes/members/accessibility/protectedInstanceMemberAccessibility.ts] ////

//// [protectedInstanceMemberAccessibility.ts]
class A {
    protected x: string;
    protected f(): string {
        return "hello";
    }
}

class B extends A {
    protected y: string;
    g() {
        var t1 = this.x;
        var t2 = this.f();
        var t3 = this.y;
        var t4 = this.z;     // error

        var s1 = super.x;    // error
        var s2 = super.f();
        var s3 = super.y;    // error
        var s4 = super.z;    // error

        var a: A;
        var a1 = a.x;    // error
        var a2 = a.f();  // error
        var a3 = a.y;    // error
        var a4 = a.z;    // error

        var b: B;
        var b1 = b.x;
        var b2 = b.f();
        var b3 = b.y;
        var b4 = b.z;    // error

        var c: C;
        var c1 = c.x;    // error
        var c2 = c.f();  // error
        var c3 = c.y;    // error
        var c4 = c.z;    // error
    }
}

class C extends A {
    protected z: string;
}


//// [protectedInstanceMemberAccessibility.js]
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
    A.prototype.f = function () {
        return "hello";
    };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.g = function () {
        var t1 = this.x;
        var t2 = this.f();
        var t3 = this.y;
        var t4 = this.z; // error
        var s1 = _super.prototype.x; // error
        var s2 = _super.prototype.f.call(this);
        var s3 = _super.prototype.y; // error
        var s4 = _super.prototype.z; // error
        var a;
        var a1 = a.x; // error
        var a2 = a.f(); // error
        var a3 = a.y; // error
        var a4 = a.z; // error
        var b;
        var b1 = b.x;
        var b2 = b.f();
        var b3 = b.y;
        var b4 = b.z; // error
        var c;
        var c1 = c.x; // error
        var c2 = c.f(); // error
        var c3 = c.y; // error
        var c4 = c.z; // error
    };
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(A));
