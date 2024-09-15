//// [tests/cases/conformance/types/thisType/thisTypeInFunctionsNegative.ts] ////

//// [thisTypeInFunctionsNegative.ts]
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
		return this.n + m; // 'n' doesn't exist on type 'void'.
    }
}
class D {
	x: number;
	explicitThis(this: this, m: number): number {
		return this.x + m;
	}
	explicitD(this: D, m: number): number {
		return this.x + m;
	}
}
interface I {
    a: number;
    explicitVoid1(this: void): number;
    explicitVoid2(this: void): number;
    explicitStructural(this: {a: number}): number;
    explicitInterface(this: I): number;
    explicitThis(this: this): number; // TODO: Allow `this` types for interfaces
}
let impl: I = {
    a: 12,
    explicitVoid1() {
        return this.a; // error, no 'a' in 'void'
    },
    explicitVoid2: () => this.a, // ok, `this:any` because it refers to an outer object
    explicitStructural: () => 12,
    explicitInterface: () => 12,
    explicitThis() {
        return this.a;
    },
}
let implExplicitStructural = impl.explicitStructural;
implExplicitStructural(); // error, no 'a' in 'void'
let implExplicitInterface = impl.explicitInterface;
implExplicitInterface(); // error, no 'a' in 'void' 
function explicitStructural(this: { y: number }, x: number): number {
    return x + this.y;
}
function propertyName(this: { y: number }, x: number): number {
    return x + this.notFound;
}
function voidThisSpecified(this: void, x: number): number {
    return x + this.notSpecified;
}
let ok: {y: number, f: (this: { y: number }, x: number) => number} = { y: 12, explicitStructural };
let wrongPropertyType: {y: string, f: (this: { y: number }, x: number) => number} = { y: 'foo', explicitStructural };
let wrongPropertyName: {wrongName: number, f: (this: { y: number }, x: number) => number} = { wrongName: 12, explicitStructural };

ok.f(); // not enough arguments
ok.f('wrong type');
ok.f(13, 'too many arguments');
wrongPropertyType.f(13);
wrongPropertyName.f(13);

let c = new C();
c.explicitC(); // not enough arguments
c.explicitC('wrong type');
c.explicitC(13, 'too many arguments');
c.explicitThis(); // not enough arguments
c.explicitThis('wrong type 2');
c.explicitThis(14, 'too many arguments 2');
c.implicitThis(); // not enough arguments
c.implicitThis('wrong type 2');
c.implicitThis(14, 'too many arguments 2');
c.explicitProperty(); // not enough arguments
c.explicitProperty('wrong type 3');
c.explicitProperty(15, 'too many arguments 3');

// oops, this triggers contextual typing, which needs to be updated to understand that =>'s `this` is void.
let specifiedToVoid: (this: void, x: number) => number = explicitStructural;

let reconstructed: { 
    n: number,
    explicitThis(this: C, m: number): number, // note: this: this is not allowed in an object literal type.
    explicitC(this: C, m: number): number,
    explicitProperty: (this: {n : number}, m: number) => number,
    explicitVoid(this: void, m: number): number,
} = { 
    n: 12,
    explicitThis: c.explicitThis,
    explicitC: c.explicitC,
    explicitProperty: c.explicitProperty,
    explicitVoid: c.explicitVoid
};;

// lambdas have this: void for assignability purposes (and this unbound (free) for body checking)
let d = new D();
let explicitXProperty: (this: { x: number }, m: number) => number;

// from differing object types
c.explicitC = function(this: D, m: number) { return this.x + m };
c.explicitProperty = explicitXProperty;

c.explicitC = d.explicitD;
c.explicitC = d.explicitThis;
c.explicitThis = d.explicitD;
c.explicitThis = d.explicitThis;
c.explicitProperty = d.explicitD;
c.explicitThis = d.explicitThis;
c.explicitVoid = d.explicitD;
c.explicitVoid = d.explicitThis;

/// class-based polymorphic assignability (with inheritance!) ///

class Base1 {
    x: number
    public polymorphic(this: this): number { return this.x; }
    explicit(this: Base1): number { return this.x; }
    static explicitStatic(this: typeof Base1): number { return this.x; }
}
class Derived1 extends Base1 {
    y: number
}
class Base2 {
    y: number
    polymorphic(this: this): number { return this.y; }
    explicit(this: Base1): number { return this.x; }
}
class Derived2 extends Base2 {
    x: number
}


let b1 = new Base1();
let d1 = new Derived1();
let b2 = new Base2();
let d2 = new Derived2();

b1.polymorphic = b2.polymorphic // error, 'this.y' not in Base1: { x }
b1.explicit = b2.polymorphic // error, 'y' not in Base1: { x }

d1.explicit = b2.polymorphic // error, 'y' not in Base1: { x }

////// use this-type for construction with new ////
function VoidThis(this: void) {

}
let voidThis = new VoidThis();

///// syntax-ish errors /////
class ThisConstructor {
    constructor(this: ThisConstructor, private n: number) {
    }
}
interface ThisConstructorInterface {
    new(this: ThisConstructor, n: number);
}
var thisConstructorType: new (this: number) => number;
function notFirst(a: number, this: C): number { return this.n; }

///// parse errors /////
function modifiers(async this: C): number { return this.n; }
function restParam(...this: C): number { return this.n; }
function optional(this?: C): number { return this.n; }
function decorated(@deco() this: C): number { return this.n; }
function initializer(this: C = new C()): number { return this.n; }

// can't name parameters 'this' in a lambda.
c.explicitProperty = (this, m) => m + this.n;
const f2 = <T>(this: {n: number}, m: number) => m + this.n;
const f3 = async (this: {n: number}, m: number) => m + this.n;
const f4 = async <T>(this: {n: number}, m: number) => m + this.n;

class Derived3 extends Base2 {
    f(this: this) {
        super.polymorphic();
    }
}


//// [thisTypeInFunctionsNegative.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class C {
    explicitThis(m) {
        return this.n + m;
    }
    implicitThis(m) {
        return this.n + m;
    }
    explicitC(m) {
        return this.n + m;
    }
    explicitProperty(m) {
        return this.n + m;
    }
    explicitVoid(m) {
        return this.n + m; // 'n' doesn't exist on type 'void'.
    }
}
class D {
    explicitThis(m) {
        return this.x + m;
    }
    explicitD(m) {
        return this.x + m;
    }
}
let impl = {
    a: 12,
    explicitVoid1() {
        return this.a; // error, no 'a' in 'void'
    },
    explicitVoid2: () => this.a, // ok, `this:any` because it refers to an outer object
    explicitStructural: () => 12,
    explicitInterface: () => 12,
    explicitThis() {
        return this.a;
    },
};
let implExplicitStructural = impl.explicitStructural;
implExplicitStructural(); // error, no 'a' in 'void'
let implExplicitInterface = impl.explicitInterface;
implExplicitInterface(); // error, no 'a' in 'void' 
function explicitStructural(x) {
    return x + this.y;
}
function propertyName(x) {
    return x + this.notFound;
}
function voidThisSpecified(x) {
    return x + this.notSpecified;
}
let ok = { y: 12, explicitStructural };
let wrongPropertyType = { y: 'foo', explicitStructural };
let wrongPropertyName = { wrongName: 12, explicitStructural };
ok.f(); // not enough arguments
ok.f('wrong type');
ok.f(13, 'too many arguments');
wrongPropertyType.f(13);
wrongPropertyName.f(13);
let c = new C();
c.explicitC(); // not enough arguments
c.explicitC('wrong type');
c.explicitC(13, 'too many arguments');
c.explicitThis(); // not enough arguments
c.explicitThis('wrong type 2');
c.explicitThis(14, 'too many arguments 2');
c.implicitThis(); // not enough arguments
c.implicitThis('wrong type 2');
c.implicitThis(14, 'too many arguments 2');
c.explicitProperty(); // not enough arguments
c.explicitProperty('wrong type 3');
c.explicitProperty(15, 'too many arguments 3');
// oops, this triggers contextual typing, which needs to be updated to understand that =>'s `this` is void.
let specifiedToVoid = explicitStructural;
let reconstructed = {
    n: 12,
    explicitThis: c.explicitThis,
    explicitC: c.explicitC,
    explicitProperty: c.explicitProperty,
    explicitVoid: c.explicitVoid
};
;
// lambdas have this: void for assignability purposes (and this unbound (free) for body checking)
let d = new D();
let explicitXProperty;
// from differing object types
c.explicitC = function (m) { return this.x + m; };
c.explicitProperty = explicitXProperty;
c.explicitC = d.explicitD;
c.explicitC = d.explicitThis;
c.explicitThis = d.explicitD;
c.explicitThis = d.explicitThis;
c.explicitProperty = d.explicitD;
c.explicitThis = d.explicitThis;
c.explicitVoid = d.explicitD;
c.explicitVoid = d.explicitThis;
/// class-based polymorphic assignability (with inheritance!) ///
class Base1 {
    polymorphic() { return this.x; }
    explicit() { return this.x; }
    static explicitStatic() { return this.x; }
}
class Derived1 extends Base1 {
}
class Base2 {
    polymorphic() { return this.y; }
    explicit() { return this.x; }
}
class Derived2 extends Base2 {
}
let b1 = new Base1();
let d1 = new Derived1();
let b2 = new Base2();
let d2 = new Derived2();
b1.polymorphic = b2.polymorphic; // error, 'this.y' not in Base1: { x }
b1.explicit = b2.polymorphic; // error, 'y' not in Base1: { x }
d1.explicit = b2.polymorphic; // error, 'y' not in Base1: { x }
////// use this-type for construction with new ////
function VoidThis() {
}
let voidThis = new VoidThis();
///// syntax-ish errors /////
class ThisConstructor {
    constructor(n) {
        this.n = n;
    }
}
var thisConstructorType;
function notFirst(a) { return this.n; }
///// parse errors /////
function modifiers() { return this.n; }
function restParam(...) { return this.n; }
function optional() { return this.n; }
function decorated() { return this.n; }
();
number;
{
    return this.n;
}
// can't name parameters 'this' in a lambda.
c.explicitProperty = (m) => m + this.n;
const f2 = (m) => m + this.n;
const f3 = (m) => __awaiter(this, void 0, void 0, function* () { return m + this.n; });
const f4 = (m) => __awaiter(this, void 0, void 0, function* () { return m + this.n; });
class Derived3 extends Base2 {
    f() {
        super.polymorphic();
    }
}
