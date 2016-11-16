//// [assignmentLHSIsValue.ts]
// expected error for all the LHS of assignments
var value: any;

// this
class C {
    constructor() { this = value; }
    foo() { this = value; }
    static sfoo() { this = value; }
}

function foo() { this = value; }

this = value;

// identifiers: module, class, enum, function
module M { export var a; }
M = value;

C = value;

enum E { }
E = value;

foo = value;

// literals
null = value;
true = value;
false = value;
0 = value;
'' = value;
/d+/ = value;

// object literals
{ a: 0} = value;

// array literals
['', ''] = value;

// super
class Derived extends C {
    constructor() { super(); super = value; }

    foo() { super = value }

    static sfoo() { super = value; }
}

// function expression
function bar() { } = value;
() => { } = value;

// function calls
foo() = value;

// parentheses, the containted expression is value
(this) = value;
(M) = value;
(C) = value;
(E) = value;
(foo) = value;
(null) = value;
(true) = value;
(0) = value;
('') = value;
(/d+/) = value;
({}) = value;
([]) = value;
(function baz() { }) = value;
(foo()) = value;

//// [assignmentLHSIsValue.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
// expected error for all the LHS of assignments
var value;
// this
var C = (function () {
    function C() {
        this = value;
    }
    C.prototype.foo = function () { this = value; };
    C.sfoo = function () { this = value; };
    return C;
}());
function foo() { this = value; }
this = value;
// identifiers: module, class, enum, function
var M;
(function (M) {
})(M || (M = {}));
M = value;
C = value;
var E;
(function (E) {
})(E || (E = {}));
E = value;
foo = value;
// literals
null = value;
true = value;
false = value;
0 = value;
'' = value;
/d+/ = value;
// object literals
{
    a: 0;
}
value;
// array literals
_a = __read(value, 2), '' = _a[0], '' = _a[1];
// super
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super.call(this) || this;
        _super.prototype. = value;
        return _this;
    }
    Derived.prototype.foo = function () { _super.prototype. = value; };
    Derived.sfoo = function () { _super. = value; };
    return Derived;
}(C));
// function expression
function bar() { }
value;
(function () { });
value;
// function calls
foo() = value;
// parentheses, the containted expression is value
(this) = value;
(M) = value;
(C) = value;
(E) = value;
(foo) = value;
(null) = value;
(true) = value;
(0) = value;
('') = value;
(/d+/) = value;
({}) = value;
([]) = value;
(function baz() { }) = value;
(foo()) = value;
var _a;
