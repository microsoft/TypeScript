
class A {
    propA: number;
}

class B {
    propB: number;
}

class C extends A {
    propC: number;
}

declare function isA(p1: any): p1 is A;
declare function isB(p1: any): p1 is B;
declare function isC(p1: any): p1 is C;

declare function retC(): C;

var a: A;
var b: B;

// Basic.
if (isC(a)) {
    a.propC;
}

// Sub type.
var subType: C;
if(isA(subType)) {
    subType.propC;
}

// Union type.
var union: A | B;
if(isA(union)) {
    union.propA;
}

// The parameter index and argument index for the type guard target is matching.
// The type predicate type is assignable to the parameter type.
declare function isC_multipleParams(p1, p2): p1 is C;
if (isC_multipleParams(a, 0)) {
    a.propC;
}

// Evaluations are asssignable to boolean.
declare function acceptingBoolean(a: boolean);
acceptingBoolean(isA(a));

// Type predicates with different parameter name.
declare function acceptingTypeGuardFunction(p1: (item) => item is A);
acceptingTypeGuardFunction(isA);

let union2: C | B;
let union3: boolean | B = isA(union2) || union2;