//// [thisTypeInFunctions.ts]
// body checking
class C {
    n: number;
    explicitThis(this: this, m: number): number {
        return this.n + m;
    }
    implicitThis(m: number): number {
        return this.n + m;
    }
    explicitC(this: C, m: number): number {
        return this.n + m;
    }
    explicitProperty(this: {n: number}, m: number): number {
        return this.n + m;
    }
    explicitVoid(this: void, m: number): number {
        return m + 1;
    }
}
class D extends C { }
class B {
    n: number;
}
interface I {
    a: number;
    explicitVoid1(this: void): number;
    explicitVoid2(this: void): number;
    explicitStructural(this: {a: number}): number;
    explicitInterface(this: I): number;
    explicitThis(this: this): number;
    implicitMethod(): number;
    implicitFunction: () => number;
}
function explicitStructural(this: { y: number }, x: number): number {
    return x + this.y;
}
function justThis(this: { y: number }): number {
    return this.y;
}
function implicitThis(n: number): number {
    return 12;
}
let impl: I = {
    a: 12,
    explicitVoid2: () => this.a, // ok, this: any because it refers to some outer object (window?)
    explicitVoid1() { return 12; },
    explicitStructural() {
        return this.a;
    },
    explicitInterface() {
        return this.a;
    },
    explicitThis() {
        return this.a;
    },
    implicitMethod() {
        return this.a;
    },
    implicitFunction: () => this.a, // ok, this: any because it refers to some outer object (window?)
}
impl.explicitVoid1 = function () { return 12; };
impl.explicitVoid2 = () => 12;
impl.explicitStructural = function() { return this.a; };
impl.explicitInterface = function() { return this.a; };
impl.explicitStructural = () => 12;
impl.explicitInterface = () => 12;
impl.explicitThis = function () { return this.a; };
impl.implicitMethod = function () { return this.a; };
impl.implicitMethod = () => 12;
impl.implicitFunction = () => this.a; // ok, this: any because it refers to some outer object (window?)
// parameter checking
let ok: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, f: explicitStructural };
let implicitAnyOk: {notSpecified: number, f: (x: number) => number} = { notSpecified: 12, f: implicitThis };
ok.f(13);
implicitThis(12);
implicitAnyOk.f(12);

let c = new C();
let d = new D();
let ripped = c.explicitC;
c.explicitC(12);
c.explicitProperty(12);
c.explicitThis(12);
c.implicitThis(12);
d.explicitC(12);
d.explicitProperty(12);
d.explicitThis(12);
d.implicitThis(12);
let reconstructed: { 
    n: number,
    explicitThis(this: C, m: number): number, // note: this: this is not allowed in an object literal type.
    implicitThis(m: number): number,
    explicitC(this: C, m: number): number,
    explicitProperty: (this: {n : number}, m: number) => number,
    explicitVoid(this: void, m: number): number,
} = { 
    n: 12,
    explicitThis: c.explicitThis,
    implicitThis: c.implicitThis,
    explicitC: c.explicitC,
    explicitProperty: c.explicitProperty,
    explicitVoid: c.explicitVoid
};
reconstructed.explicitProperty(11);
reconstructed.implicitThis(11);

// assignment checking
let unboundToSpecified: (this: { y: number }, x: number) => number = x => x + this.y; // ok, this:any
let specifiedToSpecified: (this: {y: number}, x: number) => number = explicitStructural;
let anyToSpecified: (this: { y: number }, x: number) => number = function(x: number): number { return x + 12; };

let unspecifiedLambda: (x: number) => number = x => x + 12;
let specifiedLambda: (this: void, x: number) => number = x => x + 12;
let unspecifiedLambdaToSpecified: (this: {y: number}, x: number) => number = unspecifiedLambda;
let specifiedLambdaToSpecified: (this: {y: number}, x: number) => number = specifiedLambda;


let explicitCFunction: (this: C, m: number) => number;
let explicitPropertyFunction: (this: {n: number}, m: number) => number;
c.explicitC = explicitCFunction;
c.explicitC = function(this: C, m: number) { return this.n + m };
c.explicitProperty = explicitPropertyFunction;
c.explicitProperty = function(this: {n: number}, m: number) { return this.n + m };
c.explicitProperty = reconstructed.explicitProperty;

// lambdas are assignable to anything
c.explicitC = m => m;
c.explicitThis = m => m;
c.explicitProperty = m => m;

// this inside lambdas refer to outer scope
// the outer-scoped lambda at top-level is still just `any`
c.explicitC = m => m + this.n;
c.explicitThis = m => m + this.n;
c.explicitProperty = m => m + this.n;

//NOTE: this=C here, I guess?
c.explicitThis = explicitCFunction;
c.explicitThis = function(this: C, m: number) { return this.n + m };

// this:any compatibility
c.explicitC = function(m: number) { return this.n + m };
c.explicitProperty = function(m: number) { return this.n + m };
c.explicitThis = function(m: number) { return this.n + m };
c.implicitThis = function(m: number) { return this.n + m };
c.implicitThis = reconstructed.implicitThis;

c.explicitC = function(this: B, m: number) { return this.n + m };

// this:void compatibility
c.explicitVoid = n => n;

// class-based assignability
class Base1 {
    x: number;
    public implicit(): number { return this.x; }
    explicit(this: Base1): number { return this.x; }
    static implicitStatic(): number { return this.y; }
    static explicitStatic(this: typeof Base1): number { return this.y; }
    static y: number;

}
class Derived1 extends Base1 {
    y: number
}
class Base2 {
    y: number
    implicit(): number { return this.y; }
    explicit(this: Base1): number { return this.x; }
}
class Derived2 extends Base2 {
    x: number
}
let b1 = new Base1();
let b2 = new Base2();
let d1 = new Derived1();
let d2 = new Derived2();
d2.implicit = d1.implicit // ok, 'x' and 'y' in { x, y } (d assignable to f and vice versa)
d1.implicit = d2.implicit // ok, 'x' and 'y' in { x, y } (f assignable to d and vice versa)

// bivariance-allowed cases
d1.implicit = b2.implicit // ok, 'y' in D: { x, y } (d assignable e) 
d2.implicit = d1.explicit // ok, 'y' in { x, y } (c assignable to f)
b1.implicit = d2.implicit // ok, 'x' and 'y' not in C: { x } (c assignable to f) 
b1.explicit = d2.implicit // ok, 'x' and 'y' not in C: { x } (c assignable to f)

////// use this-type for construction with new ////
function InterfaceThis(this: I) {
    this.a = 12;
}
function LiteralTypeThis(this: {x: string}) {
    this.x = "ok";
}
function AnyThis(this: any) {
    this.x = "ok";
}
let interfaceThis = new InterfaceThis();
let literalTypeThis = new LiteralTypeThis();
let anyThis = new AnyThis();

//// type parameter inference ////
declare var f: { 
    (this: void, x: number): number, 
    call<U>(this: (...argArray: any[]) => U, ...argArray: any[]): U;
};
let n: number = f.call(12);

function missingTypeIsImplicitAny(this, a: number) { return a; } 

//// [thisTypeInFunctions.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _this = this;
// body checking
var C = (function () {
    function C() {
    }
    C.prototype.explicitThis = function (m) {
        return this.n + m;
    };
    C.prototype.implicitThis = function (m) {
        return this.n + m;
    };
    C.prototype.explicitC = function (m) {
        return this.n + m;
    };
    C.prototype.explicitProperty = function (m) {
        return this.n + m;
    };
    C.prototype.explicitVoid = function (m) {
        return m + 1;
    };
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
}(C));
var B = (function () {
    function B() {
    }
    return B;
}());
function explicitStructural(x) {
    return x + this.y;
}
function justThis() {
    return this.y;
}
function implicitThis(n) {
    return 12;
}
var impl = {
    a: 12,
    explicitVoid2: function () { return _this.a; },
    explicitVoid1: function () { return 12; },
    explicitStructural: function () {
        return this.a;
    },
    explicitInterface: function () {
        return this.a;
    },
    explicitThis: function () {
        return this.a;
    },
    implicitMethod: function () {
        return this.a;
    },
    implicitFunction: function () { return _this.a; }
};
impl.explicitVoid1 = function () { return 12; };
impl.explicitVoid2 = function () { return 12; };
impl.explicitStructural = function () { return this.a; };
impl.explicitInterface = function () { return this.a; };
impl.explicitStructural = function () { return 12; };
impl.explicitInterface = function () { return 12; };
impl.explicitThis = function () { return this.a; };
impl.implicitMethod = function () { return this.a; };
impl.implicitMethod = function () { return 12; };
impl.implicitFunction = function () { return _this.a; }; // ok, this: any because it refers to some outer object (window?)
// parameter checking
var ok = { y: 12, f: explicitStructural };
var implicitAnyOk = { notSpecified: 12, f: implicitThis };
ok.f(13);
implicitThis(12);
implicitAnyOk.f(12);
var c = new C();
var d = new D();
var ripped = c.explicitC;
c.explicitC(12);
c.explicitProperty(12);
c.explicitThis(12);
c.implicitThis(12);
d.explicitC(12);
d.explicitProperty(12);
d.explicitThis(12);
d.implicitThis(12);
var reconstructed = {
    n: 12,
    explicitThis: c.explicitThis,
    implicitThis: c.implicitThis,
    explicitC: c.explicitC,
    explicitProperty: c.explicitProperty,
    explicitVoid: c.explicitVoid
};
reconstructed.explicitProperty(11);
reconstructed.implicitThis(11);
// assignment checking
var unboundToSpecified = function (x) { return x + _this.y; }; // ok, this:any
var specifiedToSpecified = explicitStructural;
var anyToSpecified = function (x) { return x + 12; };
var unspecifiedLambda = function (x) { return x + 12; };
var specifiedLambda = function (x) { return x + 12; };
var unspecifiedLambdaToSpecified = unspecifiedLambda;
var specifiedLambdaToSpecified = specifiedLambda;
var explicitCFunction;
var explicitPropertyFunction;
c.explicitC = explicitCFunction;
c.explicitC = function (m) { return this.n + m; };
c.explicitProperty = explicitPropertyFunction;
c.explicitProperty = function (m) { return this.n + m; };
c.explicitProperty = reconstructed.explicitProperty;
// lambdas are assignable to anything
c.explicitC = function (m) { return m; };
c.explicitThis = function (m) { return m; };
c.explicitProperty = function (m) { return m; };
// this inside lambdas refer to outer scope
// the outer-scoped lambda at top-level is still just `any`
c.explicitC = function (m) { return m + _this.n; };
c.explicitThis = function (m) { return m + _this.n; };
c.explicitProperty = function (m) { return m + _this.n; };
//NOTE: this=C here, I guess?
c.explicitThis = explicitCFunction;
c.explicitThis = function (m) { return this.n + m; };
// this:any compatibility
c.explicitC = function (m) { return this.n + m; };
c.explicitProperty = function (m) { return this.n + m; };
c.explicitThis = function (m) { return this.n + m; };
c.implicitThis = function (m) { return this.n + m; };
c.implicitThis = reconstructed.implicitThis;
c.explicitC = function (m) { return this.n + m; };
// this:void compatibility
c.explicitVoid = function (n) { return n; };
// class-based assignability
var Base1 = (function () {
    function Base1() {
    }
    Base1.prototype.implicit = function () { return this.x; };
    Base1.prototype.explicit = function () { return this.x; };
    Base1.implicitStatic = function () { return this.y; };
    Base1.explicitStatic = function () { return this.y; };
    return Base1;
}());
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        _super.apply(this, arguments);
    }
    return Derived1;
}(Base1));
var Base2 = (function () {
    function Base2() {
    }
    Base2.prototype.implicit = function () { return this.y; };
    Base2.prototype.explicit = function () { return this.x; };
    return Base2;
}());
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    return Derived2;
}(Base2));
var b1 = new Base1();
var b2 = new Base2();
var d1 = new Derived1();
var d2 = new Derived2();
d2.implicit = d1.implicit; // ok, 'x' and 'y' in { x, y } (d assignable to f and vice versa)
d1.implicit = d2.implicit; // ok, 'x' and 'y' in { x, y } (f assignable to d and vice versa)
// bivariance-allowed cases
d1.implicit = b2.implicit; // ok, 'y' in D: { x, y } (d assignable e) 
d2.implicit = d1.explicit; // ok, 'y' in { x, y } (c assignable to f)
b1.implicit = d2.implicit; // ok, 'x' and 'y' not in C: { x } (c assignable to f) 
b1.explicit = d2.implicit; // ok, 'x' and 'y' not in C: { x } (c assignable to f)
////// use this-type for construction with new ////
function InterfaceThis() {
    this.a = 12;
}
function LiteralTypeThis() {
    this.x = "ok";
}
function AnyThis() {
    this.x = "ok";
}
var interfaceThis = new InterfaceThis();
var literalTypeThis = new LiteralTypeThis();
var anyThis = new AnyThis();
var n = f.call(12);
function missingTypeIsImplicitAny(a) { return a; }
