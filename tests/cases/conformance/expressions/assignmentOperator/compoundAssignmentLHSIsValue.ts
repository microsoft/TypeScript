// @allowUnusedLabels: true

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