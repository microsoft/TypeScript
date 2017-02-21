//// [classUpdateTests.ts]
//
// test codegen for instance properties
//
class A {
	public p1 = 0;
	private p2 = 0;
	p3;
}

class B {
	public p1 = 0;
	private p2 = 0;
	p3;

	constructor() {}
}

class C {
	constructor(public p1=0, private p2=0, p3=0) {}
}

//
// test requirements for super calls
//
class D { // NO ERROR
	
}

class E extends D { // NO ERROR
	public p1 = 0;
}

class F extends E {
	constructor() {} // ERROR - super call required
}

class G extends D {
	public p1 = 0;
	constructor() { super(); } // NO ERROR
}

class H {
	constructor() { super(); } // ERROR - no super call allowed
}

class I extends Object {
	constructor() { super(); } // ERROR - no super call allowed
}

class J extends G {
	constructor(public p1:number) {
		super(); // NO ERROR
	}
}

class K extends G {
	constructor(public p1:number) { // ERROR
		var i = 0;
		super();
	}
}

class L extends G {
	constructor(private p1:number) {
		super(); // NO ERROR
	}
}

class M extends G {
	constructor(private p1:number) { // ERROR
		var i = 0;
		super();
	}
}

//
// test this reference in field initializers
//
class N {
	public p1 = 0;
	public p2 = this.p1;

	constructor() {
		this.p2 = 0;
	}
}

//
// test error on property declarations within class constructors
//
class O {
	constructor() {
		public p1 = 0; // ERROR
	}
}

class P {
	constructor() {
		private p1 = 0; // ERROR
	}
}

class Q {
	constructor() {
		public this.p1 = 0; // ERROR
	}
}

class R {
	constructor() {
		private this.p1 = 0; // ERROR
	}
}

//// [classUpdateTests.js]
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
//
// test codegen for instance properties
//
var A = (function () {
    function A() {
        this.p1 = 0;
        this.p2 = 0;
    }
    return A;
}());
var B = (function () {
    function B() {
        this.p1 = 0;
        this.p2 = 0;
    }
    return B;
}());
var C = (function () {
    function C(p1, p2, p3) {
        if (p1 === void 0) { p1 = 0; }
        if (p2 === void 0) { p2 = 0; }
        if (p3 === void 0) { p3 = 0; }
        this.p1 = p1;
        this.p2 = p2;
    }
    return C;
}());
//
// test requirements for super calls
//
var D = (function () {
    function D() {
    }
    return D;
}());
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.p1 = 0;
        return _this;
    }
    return E;
}(D));
var F = (function (_super) {
    __extends(F, _super);
    function F() {
        var _this = this;
        return _this;
    } // ERROR - super call required
    return F;
}(E));
var G = (function (_super) {
    __extends(G, _super);
    function G() {
        var _this = _super.call(this) || this;
        _this.p1 = 0;
        return _this;
    } // NO ERROR
    return G;
}(D));
var H = (function () {
    function H() {
        _this = _super.call(this) || this;
    } // ERROR - no super call allowed
    return H;
}());
var I = (function (_super) {
    __extends(I, _super);
    function I() {
        return _super.call(this) || this;
    } // ERROR - no super call allowed
    return I;
}(Object));
var J = (function (_super) {
    __extends(J, _super);
    function J(p1) {
        var _this = _super.call(this) || this;
        _this.p1 = p1;
        return _this;
    }
    return J;
}(G));
var K = (function (_super) {
    __extends(K, _super);
    function K(p1) {
        var _this = this;
        _this.p1 = p1;
        var i = 0;
        _this = _super.call(this) || this;
        return _this;
    }
    return K;
}(G));
var L = (function (_super) {
    __extends(L, _super);
    function L(p1) {
        var _this = _super.call(this) || this;
        _this.p1 = p1;
        return _this;
    }
    return L;
}(G));
var M = (function (_super) {
    __extends(M, _super);
    function M(p1) {
        var _this = this;
        _this.p1 = p1;
        var i = 0;
        _this = _super.call(this) || this;
        return _this;
    }
    return M;
}(G));
//
// test this reference in field initializers
//
var N = (function () {
    function N() {
        this.p1 = 0;
        this.p2 = this.p1;
        this.p2 = 0;
    }
    return N;
}());
//
// test error on property declarations within class constructors
//
var O = (function () {
    function O() {
        this.p1 = 0; // ERROR
    }
    return O;
}());
var P = (function () {
    function P() {
        this.p1 = 0; // ERROR
    }
    return P;
}());
var Q = (function () {
    function Q() {
        this.p1 = 0; // ERROR
    }
    return Q;
}());
var R = (function () {
    function R() {
        this.p1 = 0; // ERROR
    }
    return R;
}());
