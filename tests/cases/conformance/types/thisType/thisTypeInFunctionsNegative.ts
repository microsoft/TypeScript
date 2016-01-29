// @strictThis: true
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
	implicitD(m: number): number {
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
    implicitMethod(): number;
    implicitFunction: () => number;
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
    implicitMethod() {
        return this.a; // ok, I.a: number
    },
    implicitFunction: function () { return this.a; } // TODO: error 'a' not found in 'void'
}
let implExplicitStructural = impl.explicitStructural;
implExplicitStructural(); // error, no 'a' in 'void'
let implExplicitInterface = impl.explicitInterface;
implExplicitInterface(); // error, no 'a' in 'void' 
let implImplicitMethod = impl.implicitMethod;
implImplicitMethod(); // error, no 'a' in 'void'
function explicitStructural(this: { y: number }, x: number): number {
    return x + this.y;
}
function propertyName(this: { y: number }, x: number): number {
    return x + this.notFound;
}
function voidThisSpecified(this: void, x: number): number {
    return x + this.notSpecified;
}
function noThisSpecified(x: number): number {
    // this:void unless loose-this is on
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
let specifiedToImplicitVoid: (x: number) => number = explicitStructural;

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
    implicitThis: c.implicitThis, // error not assignable -- c.this:c<this> not assignable to this:void.
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

c.explicitC = d.implicitD;
c.explicitC = d.explicitD;
c.explicitC = d.explicitThis;
c.explicitThis = d.implicitD;
c.explicitThis = d.explicitD;
c.explicitThis = d.explicitThis;
c.explicitProperty = d.explicitD;
c.explicitProperty = d.implicitD;
c.explicitThis = d.explicitThis;
c.explicitVoid = d.implicitD;
c.explicitVoid = d.explicitD;
c.explicitVoid = d.explicitThis;

/// class-based implicit assignability (with inheritance!) ///

class Base1 {
    x: number
    public implicit(): number { return this.x; }
    explicit(this: Base1): number { return this.x; }
    static implicitStatic(): number { return this.x; }
    static explicitStatic(this: typeof Base1): number { return this.x; }
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
let d1 = new Derived1();
let b2 = new Base2();
let d2 = new Derived2();

b1.implicit = b2.implicit // error, 'this.y' not in C: { x } (c assignable to e)
b1.explicit = b2.implicit // error, 'y' not in C: { x } (c assignable to e)

d1.explicit = b2.implicit // error, 'y' not in C: { x } (c assignable to e)

////// use this-type for construction with new ////
function VoidThis(this: void) {

}
function ImplicitVoidThis() {

}
let voidThis = new VoidThis();
let implicitVoidThis = new ImplicitVoidThis();


///// parse errors /////
function notFirst(a: number, this: C): number { return this.n; }
function modifiers(async this: C): number { return this.n; }
function restParam(...this: C): number { return this.n; }
function optional(this?: C): number { return this.n; }
function decorated(@deco() this: C): number { return this.n; }
function initializer(this: C = new C()): number { return this.n; }

// can't name parameters 'this' in a lambda.
c.explicitProperty = (this, m) => m + this.n;
