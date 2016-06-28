//// [staticPropSuper.ts]
class A {
}

class B extends A {
    public static s: number = 9;

    constructor() {
        var x = 1; // should not error
        super();
    }
}

class C extends A {
    public p: number = 10;

    constructor() {
        var x = 1; // should error
    }
}

class D extends A {
    private p: number = 11;

    constructor() {
        var x = 1; // should error
    }
}

class E extends A {
    p: number = 12;

    constructor() {
        var x = 1; // should error
    }
}

//// [staticPropSuper.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        var x = 1; // should not error
        _super.call(this);
    }
    B.s = 9;
    return B;
}(A));
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        this.p = 10;
        var x = 1; // should error
    }
    return C;
}(A));
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        this.p = 11;
        var x = 1; // should error
    }
    return D;
}(A));
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        this.p = 12;
        var x = 1; // should error
    }
    return E;
}(A));
