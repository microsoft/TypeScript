// @noimplicitany: true
// @target: es5

// Error expected
var a: typeof a;

// Error expected on b or c
var b: typeof c;
var c: typeof b;

// Error expected
var d: Array<typeof d>;

function f() { return f; }

// Error expected
function g() { return g(); }

// Error expected
var f1 = function () {
    return f1();
};

// Error expected
var f2 = () => f2();

// Error expected
function h() {
    return foo();
    function foo() {
        return h() || "hello";
    }
}

interface A {
    s: string;
}

function foo(x: A): string { return "abc"; }

class C {
    // Error expected
    s = foo(this);
}

class D {
    // Error expected
    get x() {
        return this.x;
    }
}
