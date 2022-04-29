// @allowUnreachableCode: true

// FunctionExpression with no return type annotation and no return statement returns void
var v: void = function () { } ();

// FunctionExpression f with no return type annotation and directly references f in its body returns any
var a: any = function f() {
    return f;
};
var a: any = function f() {
    return f();
};

// FunctionExpression f with no return type annotation and indirectly references f in its body returns any
var a: any = function f() {
    var x = f;
    return x;
};

// Two mutually recursive function implementations with no return type annotations
function rec1() {
    return rec2();
}
function rec2() {
    return rec1();
}
var a = rec1();
var a = rec2();

// Two mutually recursive function implementations with return type annotation in one
function rec3(): number {
    return rec4();
}
function rec4() {
    return rec3();
}
var n: number;
var n = rec3();
var n = rec4();

// FunctionExpression with no return type annotation and returns a number
var n = function () {
    return 3;
} ();

// FunctionExpression with no return type annotation and returns null
var nu = null;
var nu = function () {
    return null;
} ();

// FunctionExpression with no return type annotation and returns undefined
var un = undefined;
var un = function () {
    return undefined;
} ();

// FunctionExpression with no return type annotation and returns a type parameter type
var n = function <T>(x: T) {
    return x;
} (4);

// FunctionExpression with no return type annotation and returns a constrained type parameter type
var n = function <T extends {}>(x: T) {
    return x;
} (4);

// FunctionExpression with no return type annotation with multiple return statements with identical types
var n = function () {
    return 3;
    return 5;
}();

// Otherwise, the inferred return type is the first of the types of the return statement expressions
// in the function body that is a supertype of each of the others, 
// ignoring return statements with no expressions.
// A compile - time error occurs if no return statement expression has a type that is a supertype of each of the others.
// FunctionExpression with no return type annotation with multiple return statements with subtype relation between returns
class Base { private m; }
class Derived extends Base { private q; }
var b: Base;
var b = function () {
    return new Base(); return new Derived();
} ();

// FunctionExpression with no return type annotation with multiple return statements with one a recursive call
var a = function f() {
    return new Base(); return new Derived(); return f(); // ?
} ();

// FunctionExpression with non -void return type annotation with a single throw statement
undefined === function (): number {
    throw undefined;
};

// Type of 'this' in function implementation is 'any'
function thisFunc() {
    var x = this;
    var x: any;
}

// Function signature with optional parameter, no type annotation and initializer has initializer's type
function opt1(n = 4) {
    var m = n;
    var m: number;
}

// Function signature with optional parameter, no type annotation and initializer has initializer's widened type
function opt2(n = { x: null, y: undefined }) {
    var m = n;
    var m: { x: any; y: any };
}

// Function signature with initializer referencing other parameter to the left
function opt3(n: number, m = n) {
    var y = m;
    var y: number;
}

// Function signature with optional parameter has correct codegen 
// (tested above)

// FunctionExpression with non -void return type annotation return with no expression
function f6(): number {
    return;
}

class Derived2 extends Base { private r: string; }
class AnotherClass { private x }
// if f is a contextually typed function expression, the inferred return type is the union type
// of the types of the return statement expressions in the function body, 
// ignoring return statements with no expressions.
var f7: (x: number) => string | number = x => { // should be (x: number) => number | string
    if (x < 0) { return x; }
    return x.toString();
}
var f8: (x: number) => any = x => { // should be (x: number) => Base
    return new Base();
    return new Derived2();
}
var f9: (x: number) => any = x => { // should be (x: number) => Base
    return new Base();
    return new Derived();
    return new Derived2();
}
var f10: (x: number) => any = x => { // should be (x: number) => Derived | Derived1
    return new Derived();
    return new Derived2();
}
var f11: (x: number) => any = x => { // should be (x: number) => Base | AnotherClass
    return new Base();
    return new AnotherClass();
}
var f12: (x: number) => any = x => { // should be (x: number) => Base | AnotherClass
    return new Base();
    return; // should be ignored
    return new AnotherClass();
}