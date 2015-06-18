
class A {
    propA: number;
}

class B {
    propB: number;
}

class C extends A {
    propC: number;
}

function hasANonBooleanReturnStatement(x): x is A {
    return '';
}

function hasTypeGuardTypeInsideTypeGuardType(x): x is x is A {
    return true;
}

function hasMissingIsKeyword(): x {
    return true;
}

function hasMissingParameter(): x is A {
    return true;
}

function hasMissingTypeInTypeGuardType(x): x is {
    return true;
}

function hasNonMatchingParameter(y): x is A {
    return true;
}

function hasNonMatchingParameterType1(x: A): x is B {
    return true;
}

function hasNonMatchingParameterType2(x: string): x is number {
    return true;
}

function hasNonMathcingGenericType<T>(a: string): a is T[] {
    return true;
}

let a: A;
let b: B;

declare function isB(p1): p1 is B;
declare function isC(p1): p1 is C;
declare function funA(p1: any, p2: any): p1 is B;
declare function hasNoTypeGuard(x);

// Passed argument is not the same as the one being guarded.
if (isB(b)) {
    a.propB;
}

// Parameter index and argument index for the type guard target is not matching.
if (funA(0, a)) {
    a.propB; // Error
}

// No type guard in if statement
if (hasNoTypeGuard(a)) {
    a.propB; 
}

// Type predicate type is not assignable
declare function acceptingDifferentSignatureTypeGuardFunction(p1: (p1) => p1 is B);
acceptingDifferentSignatureTypeGuardFunction(isC);

// Boolean not assignable to type guard
var assign1: (p1, p2) => p1 is A;
assign1 = function(p1, p2): boolean {
    return true;
};

// Must have matching parameter index
var assign2: (p1, p2) => p1 is A;
assign2 = function(p1, p2): p2 is A {
    return true;
};

// No matching signature 
var assign3: (p1, p2) => p1 is A;
assign3 = function(p1, p2, p3): p1 is A {
    return true;
};

// Type predicates in non-return type positions
var b1: b is A;
function b2(a: b is A) {};
function b3(): A | b is A {
    return true;
};

// Non-compatiable type predicate positions for signature declarations
class D {
    constructor(p1: A): p1 is C {
        return true;
    }
    get m1(p1: A): p1 is C {
        return true;
    }
    set m2(p1: A): p1 is C {
        return true;
    }
}

interface I1 {
    new (p1: A): p1 is C;
}

interface I2 {
    [index: number]: p1 is C;
}

// Reference to rest parameter
function b4(...a): a is A {
    return true;
}

// Reference to binding pattern
function b5({a, b, p1}, p2, p3): p1 is A {
    return true;
}

function b6([a, b, p1], p2, p3): p1 is A {
    return true;
}

function b7({a, b, c: {p1}}, p2, p3): p1 is A {
    return true;
}

// Should not crash the compiler
var x: A;
if (hasMissingParameter()) {
    x.propA;
}