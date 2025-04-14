//// [tests/cases/conformance/classes/mixinAccessModifiers.ts] ////

//// [mixinAccessModifiers.ts]
type Constructable = new (...args: any[]) => object;

class Private {
	constructor (...args: any[]) {}
	private p: string;
}

class Private2 {
	constructor (...args: any[]) {}
	private p: string;
}

class Protected {
	constructor (...args: any[]) {}
	protected p: string;
	protected static s: string;
}

class Protected2 {
	constructor (...args: any[]) {}
	protected p: string;
	protected static s: string;
}

class Public {
	constructor (...args: any[]) {}
	public p: string;
	public static s: string;
}

class Public2 {
	constructor (...args: any[]) {}
	public p: string;
	public static s: string;
}

function f1(x: Private & Private2) {
	x.p;  // Error, private constituent makes property inaccessible
}

function f2(x: Private & Protected) {
	x.p;  // Error, private constituent makes property inaccessible
}

function f3(x: Private & Public) {
	x.p;  // Error, private constituent makes property inaccessible
}

function f4(x: Protected & Protected2) {
	x.p;  // Error, protected when all constituents are protected
}

function f5(x: Protected & Public) {
	x.p;  // Ok, public if any constituent is public
}

function f6(x: Public & Public2) {
	x.p;  // Ok, public if any constituent is public
}

declare function Mix<T, U>(c1: T, c2: U): T & U;

// Can't derive from type with inaccessible properties

class C1 extends Mix(Private, Private2) {}
class C2 extends Mix(Private, Protected) {}
class C3 extends Mix(Private, Public) {}

class C4 extends Mix(Protected, Protected2) {
	f(c4: C4, c5: C5, c6: C6) {
		c4.p;
		c5.p;
		c6.p;
	}
	static g() {
		C4.s;
		C5.s;
		C6.s
	}
}

class C5 extends Mix(Protected, Public) {
	f(c4: C4, c5: C5, c6: C6) {
		c4.p;  // Error, not in class deriving from Protected2
		c5.p;
		c6.p;
	}
	static g() {
		C4.s;  // Error, not in class deriving from Protected2
		C5.s;
		C6.s
	}
}

class C6 extends Mix(Public, Public2) {
	f(c4: C4, c5: C5, c6: C6) {
		c4.p;  // Error, not in class deriving from Protected2
		c5.p;
		c6.p;
	}
	static g() {
		C4.s;  // Error, not in class deriving from Protected2
		C5.s;
		C6.s
	}
}

class ProtectedGeneric<T> {
	private privateMethod() {}
	protected protectedMethod() {}
}

class ProtectedGeneric2<T> {
	private privateMethod() {}
	protected protectedMethod() {}
}

function f7(x: ProtectedGeneric<{}> & ProtectedGeneric<{}>) {
	x.privateMethod(); // Error, private constituent makes method inaccessible
	x.protectedMethod(); // Error, protected when all constituents are protected
}

function f8(x: ProtectedGeneric<{a: void;}> & ProtectedGeneric2<{a:void;b:void;}>) {
	x.privateMethod(); // Error, private constituent makes method inaccessible
	x.protectedMethod(); // Error, protected when all constituents are protected
}

function f9(x: ProtectedGeneric<{a: void;}> & ProtectedGeneric<{a:void;b:void;}>) {
	x.privateMethod(); // Error, private constituent makes method inaccessible
	x.protectedMethod(); // Error, protected when all constituents are protected
}


//// [mixinAccessModifiers.js]
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
var Private = /** @class */ (function () {
    function Private() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    return Private;
}());
var Private2 = /** @class */ (function () {
    function Private2() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    return Private2;
}());
var Protected = /** @class */ (function () {
    function Protected() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    return Protected;
}());
var Protected2 = /** @class */ (function () {
    function Protected2() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    return Protected2;
}());
var Public = /** @class */ (function () {
    function Public() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    return Public;
}());
var Public2 = /** @class */ (function () {
    function Public2() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    return Public2;
}());
function f1(x) {
    x.p; // Error, private constituent makes property inaccessible
}
function f2(x) {
    x.p; // Error, private constituent makes property inaccessible
}
function f3(x) {
    x.p; // Error, private constituent makes property inaccessible
}
function f4(x) {
    x.p; // Error, protected when all constituents are protected
}
function f5(x) {
    x.p; // Ok, public if any constituent is public
}
function f6(x) {
    x.p; // Ok, public if any constituent is public
}
// Can't derive from type with inaccessible properties
var C1 = /** @class */ (function (_super) {
    __extends(C1, _super);
    function C1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C1;
}(Mix(Private, Private2)));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(Mix(Private, Protected)));
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C3;
}(Mix(Private, Public)));
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C4.prototype.f = function (c4, c5, c6) {
        c4.p;
        c5.p;
        c6.p;
    };
    C4.g = function () {
        C4.s;
        C5.s;
        C6.s;
    };
    return C4;
}(Mix(Protected, Protected2)));
var C5 = /** @class */ (function (_super) {
    __extends(C5, _super);
    function C5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C5.prototype.f = function (c4, c5, c6) {
        c4.p; // Error, not in class deriving from Protected2
        c5.p;
        c6.p;
    };
    C5.g = function () {
        C4.s; // Error, not in class deriving from Protected2
        C5.s;
        C6.s;
    };
    return C5;
}(Mix(Protected, Public)));
var C6 = /** @class */ (function (_super) {
    __extends(C6, _super);
    function C6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C6.prototype.f = function (c4, c5, c6) {
        c4.p; // Error, not in class deriving from Protected2
        c5.p;
        c6.p;
    };
    C6.g = function () {
        C4.s; // Error, not in class deriving from Protected2
        C5.s;
        C6.s;
    };
    return C6;
}(Mix(Public, Public2)));
var ProtectedGeneric = /** @class */ (function () {
    function ProtectedGeneric() {
    }
    ProtectedGeneric.prototype.privateMethod = function () { };
    ProtectedGeneric.prototype.protectedMethod = function () { };
    return ProtectedGeneric;
}());
var ProtectedGeneric2 = /** @class */ (function () {
    function ProtectedGeneric2() {
    }
    ProtectedGeneric2.prototype.privateMethod = function () { };
    ProtectedGeneric2.prototype.protectedMethod = function () { };
    return ProtectedGeneric2;
}());
function f7(x) {
    x.privateMethod(); // Error, private constituent makes method inaccessible
    x.protectedMethod(); // Error, protected when all constituents are protected
}
function f8(x) {
    x.privateMethod(); // Error, private constituent makes method inaccessible
    x.protectedMethod(); // Error, protected when all constituents are protected
}
function f9(x) {
    x.privateMethod(); // Error, private constituent makes method inaccessible
    x.protectedMethod(); // Error, protected when all constituents are protected
}


//// [mixinAccessModifiers.d.ts]
type Constructable = new (...args: any[]) => object;
declare class Private {
    constructor(...args: any[]);
    private p;
}
declare class Private2 {
    constructor(...args: any[]);
    private p;
}
declare class Protected {
    constructor(...args: any[]);
    protected p: string;
    protected static s: string;
}
declare class Protected2 {
    constructor(...args: any[]);
    protected p: string;
    protected static s: string;
}
declare class Public {
    constructor(...args: any[]);
    p: string;
    static s: string;
}
declare class Public2 {
    constructor(...args: any[]);
    p: string;
    static s: string;
}
declare function f1(x: Private & Private2): void;
declare function f2(x: Private & Protected): void;
declare function f3(x: Private & Public): void;
declare function f4(x: Protected & Protected2): void;
declare function f5(x: Protected & Public): void;
declare function f6(x: Public & Public2): void;
declare function Mix<T, U>(c1: T, c2: U): T & U;
declare const C1_base: typeof Private & typeof Private2;
declare class C1 extends C1_base {
}
declare const C2_base: typeof Private & typeof Protected;
declare class C2 extends C2_base {
}
declare const C3_base: typeof Private & typeof Public;
declare class C3 extends C3_base {
}
declare const C4_base: typeof Protected & typeof Protected2;
declare class C4 extends C4_base {
    f(c4: C4, c5: C5, c6: C6): void;
    static g(): void;
}
declare const C5_base: typeof Protected & typeof Public;
declare class C5 extends C5_base {
    f(c4: C4, c5: C5, c6: C6): void;
    static g(): void;
}
declare const C6_base: typeof Public & typeof Public2;
declare class C6 extends C6_base {
    f(c4: C4, c5: C5, c6: C6): void;
    static g(): void;
}
declare class ProtectedGeneric<T> {
    private privateMethod;
    protected protectedMethod(): void;
}
declare class ProtectedGeneric2<T> {
    private privateMethod;
    protected protectedMethod(): void;
}
declare function f7(x: ProtectedGeneric<{}> & ProtectedGeneric<{}>): void;
declare function f8(x: ProtectedGeneric<{
    a: void;
}> & ProtectedGeneric2<{
    a: void;
    b: void;
}>): void;
declare function f9(x: ProtectedGeneric<{
    a: void;
}> & ProtectedGeneric<{
    a: void;
    b: void;
}>): void;
