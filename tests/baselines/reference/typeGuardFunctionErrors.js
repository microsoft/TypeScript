//// [typeGuardFunctionErrors.ts]

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

// Type guard paramater referring to a binding pattern
declare function destructureParameter({ p1, p2, p3 }): p1 is A;


//// [typeGuardFunctionErrors.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    return A;
})();
var B = (function () {
    function B() {
    }
    return B;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(A);
function hasANonBooleanReturnStatement(x) {
    return '';
}
is;
A;
{
    return true;
}
function hasMissingIsKeyword() {
    return true;
}
return true;
function hasNonMatchingParameter(y) {
    return true;
}
function hasNonMatchingParameterType1(x) {
    return true;
}
function hasNonMatchingParameterType2(x) {
    return true;
}
function hasNonMathcingGenericType(a) {
    return true;
}
var a;
var b;
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
acceptingDifferentSignatureTypeGuardFunction(isC);
// Boolean not assignable to type guard
var assign1;
assign1 = function (p1, p2) {
    return true;
};
// Must have matching parameter index
var assign2;
assign2 = function (p1, p2) {
    return true;
};
// No matching signature 
var assign3;
assign3 = function (p1, p2, p3) {
    return true;
};
