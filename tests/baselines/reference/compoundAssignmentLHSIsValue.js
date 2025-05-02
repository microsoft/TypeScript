//// [tests/cases/conformance/expressions/assignmentOperator/compoundAssignmentLHSIsValue.ts] ////

//// [compoundAssignmentLHSIsValue.ts]
// expected error for all the LHS of compound assignments (arithmetic and addition)
var value: any;

// this
class C {
    constructor() {
        this *= value;
        this += value;
    }
    foo() {
        this *= value;
        this += value;
    }
    static sfoo() {
        this *= value;
        this += value;
    }
}

function foo() {
    this *= value;
    this += value;
}

this *= value;
this += value;

// identifiers: module, class, enum, function
module M { export var a; }
M *= value;
M += value;

C *= value;
C += value;

enum E { }
E *= value;
E += value;

foo *= value;
foo += value;

// literals
null *= value;
null += value;
true *= value;
true += value;
false *= value;
false += value;
0 *= value;
0 += value;
'' *= value;
'' += value;
/d+/ *= value;
/d+/ += value;

// object literals
{ a: 0} *= value;
{ a: 0} += value;

// array literals
['', ''] *= value;
['', ''] += value;

// super
class Derived extends C {
    constructor() {
        super();
        super *= value;
        super += value;
    }

    foo() {
        super *= value;
        super += value;
    }

    static sfoo() {
        super *= value;
        super += value;
    }
}

// function expression
function bar1() { } *= value;
function bar2() { } += value;
() => { } *= value;
() => { } += value;

// function calls
foo() *= value;
foo() += value;

// parentheses, the containted expression is value
(this) *= value;
(this) += value;
(M) *= value;
(M) += value;
(C) *= value;
(C) += value;
(E) *= value;
(E) += value;
(foo) *= value;
(foo) += value;
(null) *= value;
(null) += value;
(true) *= value;
(true) += value;
(0) *= value;
(0) += value;
('') *= value;
('') += value;
(/d+/) *= value;
(/d+/) += value;
({}) *= value;
({}) += value;
([]) *= value;
([]) += value;
(function baz1() { }) *= value;
(function baz2() { }) += value;
(foo()) *= value;
(foo()) += value;

//// [compoundAssignmentLHSIsValue.js]
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
// expected error for all the LHS of compound assignments (arithmetic and addition)
var value;
// this
var C = /** @class */ (function () {
    function C() {
        this *= value;
        this += value;
    }
    C.prototype.foo = function () {
        this *= value;
        this += value;
    };
    C.sfoo = function () {
        this *= value;
        this += value;
    };
    return C;
}());
function foo() {
    this *= value;
    this += value;
}
this *= value;
this += value;
// identifiers: module, class, enum, function
var M;
(function (M) {
})(M || (M = {}));
M *= value;
M += value;
C *= value;
C += value;
var E;
(function (E) {
})(E || (E = {}));
E *= value;
E += value;
foo *= value;
foo += value;
// literals
null *= value;
null += value;
true *= value;
true += value;
false *= value;
false += value;
0 *= value;
0 += value;
'' *= value;
'' += value;
/d+/ *= value;
/d+/ += value;
// object literals
{
    a: 0;
}
value;
{
    a: 0;
}
value;
// array literals
['', ''] *= value;
['', ''] += value;
// super
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super.call(this) || this;
        _super.prototype. *= value;
        _super.prototype. += value;
        return _this;
    }
    Derived.prototype.foo = function () {
        _super.prototype. *= value;
        _super.prototype. += value;
    };
    Derived.sfoo = function () {
        _super. *= value;
        _super. += value;
    };
    return Derived;
}(C));
// function expression
function bar1() { }
value;
function bar2() { }
value;
(function () { });
value;
(function () { });
value;
// function calls
foo() *= value;
foo() += value;
// parentheses, the containted expression is value
(this) *= value;
(this) += value;
(M) *= value;
(M) += value;
(C) *= value;
(C) += value;
(E) *= value;
(E) += value;
(foo) *= value;
(foo) += value;
(null) *= value;
(null) += value;
(true) *= value;
(true) += value;
(0) *= value;
(0) += value;
('') *= value;
('') += value;
(/d+/) *= value;
(/d+/) += value;
({}) *= value;
({}) += value;
([]) *= value;
([]) += value;
(function baz1() { }) *= value;
(function baz2() { }) += value;
(foo()) *= value;
(foo()) += value;
