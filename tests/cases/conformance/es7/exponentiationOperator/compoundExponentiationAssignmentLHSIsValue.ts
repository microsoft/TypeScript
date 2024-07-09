// @allowUnreachableCode: false
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