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

//// [typeGuardFunctionErrors.js]
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
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function () {
    function B() {
    }
    return B;
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(A));
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
function hasMissingParameter() {
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
// Type predicates in non-return type positions
var b1 = is, A;
function b2(a, A) {
    if (a === void 0) { a = is; }
}
;
is;
A;
{
    return true;
}
;
// Non-compatiable type predicate positions for signature declarations
var D = (function () {
    function D(p1) {
        return true;
    }
    Object.defineProperty(D.prototype, "m1", {
        get: function (p1) {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(D.prototype, "m2", {
        set: function (p1) {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return D;
}());
is;
C;
// Reference to rest parameter
function b4() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    return true;
}
// Reference to binding pattern
function b5(_a, p2, p3) {
    var a = _a.a, b = _a.b, p1 = _a.p1;
    return true;
}
function b6(_a, p2, p3) {
    var a = _a[0], b = _a[1], p1 = _a[2];
    return true;
}
function b7(_a, p2, p3) {
    var a = _a.a, b = _a.b, p1 = _a.c.p1;
    return true;
}
// Should not crash the compiler
var x;
if (hasMissingParameter()) {
    x.propA;
}
