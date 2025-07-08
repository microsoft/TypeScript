//// [tests/cases/conformance/es7/exponentiationOperator/compoundExponentiationAssignmentLHSIsValue.ts] ////

//// [compoundExponentiationAssignmentLHSIsValue.ts]
// expected error for all the LHS of compound assignments (arithmetic and addition)
var value: any;

// this
class C {
    constructor() {
        this **= value;
    }
    foo() {
        this **= value;
    }
    static sfoo() {
        this **= value;
    }
}

function foo() {
    this **= value;
}

this **= value;

// identifiers: module, class, enum, function
module M { export var a; }
M **= value;

C **= value;

enum E { }
E **= value;

foo **= value;

// literals
null **= value;
true **= value;
false **= value;
0 **= value;
'' **= value;
/d+/ **= value;

// object literals
{ a: 0 } **= value;

// array literals
['', ''] **= value;

// super
class Derived extends C {
    constructor() {
        super();
        super **= value;
    }

    foo() {
        super **= value;
    }

    static sfoo() {
        super **= value;
    }
}

// function expression
function bar1() { } **= value;
() => { } **= value;

// function calls
foo() **= value;

// parentheses, the containted expression is value
(this) **= value;
(M) **= value;
(C) **= value;
(E) **= value;
(foo) **= value;
(null) **= value;
(true) **= value;
(0) **= value;
('') **= value;
(/d+/) **= value;
({}) **= value;
([]) **= value;
(function baz1() { }) **= value;
(foo()) **= value;

//// [compoundExponentiationAssignmentLHSIsValue.js]
// expected error for all the LHS of compound assignments (arithmetic and addition)
var value;
// this
class C {
    constructor() {
        this = Math.pow(this, value);
    }
    foo() {
        this = Math.pow(this, value);
    }
    static sfoo() {
        this = Math.pow(this, value);
    }
}
function foo() {
    this = Math.pow(this, value);
}
this = Math.pow(this, value);
// identifiers: module, class, enum, function
var M;
(function (M) {
})(M || (M = {}));
M = Math.pow(M, value);
C = Math.pow(C, value);
var E;
(function (E) {
})(E || (E = {}));
E = Math.pow(E, value);
foo = Math.pow(foo, value);
// literals
null = Math.pow(null, value);
true = Math.pow(true, value);
false = Math.pow(false, value);
0 = Math.pow(0, value);
'' = Math.pow('', value);
/d+/ = Math.pow(/d+/, value);
// object literals
{
    a: 0;
}
value;
// array literals
['', ''] = Math.pow(['', ''], value);
// super
class Derived extends C {
    constructor() {
        var _a;
        super();
        (_a = super). = Math.pow(_a., value);
    }
    foo() {
        var _a;
        (_a = super). = Math.pow(_a., value);
    }
    static sfoo() {
        var _a;
        (_a = super). = Math.pow(_a., value);
    }
}
// function expression
function bar1() { }
value;
() => { };
value;
// function calls
foo() = Math.pow(foo(), value);
// parentheses, the containted expression is value
(this) = Math.pow((this), value);
(M) = Math.pow((M), value);
(C) = Math.pow((C), value);
(E) = Math.pow((E), value);
(foo) = Math.pow((foo), value);
(null) = Math.pow((null), value);
(true) = Math.pow((true), value);
(0) = Math.pow((0), value);
('') = Math.pow((''), value);
(/d+/) = Math.pow((/d+/), value);
({}) = Math.pow(({}), value);
([]) = Math.pow(([]), value);
(function baz1() { }) = Math.pow((function baz1() { }), value);
(foo()) = Math.pow((foo()), value);
