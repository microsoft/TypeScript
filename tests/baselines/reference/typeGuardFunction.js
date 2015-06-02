//// [typeGuardFunction.ts]

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

//// [typeGuardFunction.js]
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
var a;
var b;
// Basic.
if (isC(a)) {
    a.propC;
}
// Sub type.
var subType;
if (isA(subType)) {
    subType.propC;
}
// Union type.
var union;
if (isA(union)) {
    union.propA;
}
if (isC_multipleParams(a, 0)) {
    a.propC;
}
acceptingBoolean(isA(a));
acceptingTypeGuardFunction(isA);
var union2;
var union3 = isA(union2) || union2;
