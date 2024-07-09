//// [tests/cases/compiler/implicitAnyFromCircularInference.ts] ////

//// [implicitAnyFromCircularInference.ts]
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
    s = foo(this);
}

class D {
    // Error expected
    get x() {
        return this.x;
    }
}


//// [implicitAnyFromCircularInference.js]
// Error expected
var a;
// Error expected on b or c
var b;
var c;
// Error expected
var d;
function f() { return f; }
// Error expected
function g() { return g(); }
// Error expected
var f1 = function () {
    return f1();
};
// Error expected
var f2 = function () { return f2(); };
// Error expected
function h() {
    return foo();
    function foo() {
        return h() || "hello";
    }
}
function foo(x) { return "abc"; }
var C = /** @class */ (function () {
    function C() {
        this.s = foo(this);
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    Object.defineProperty(D.prototype, "x", {
        // Error expected
        get: function () {
            return this.x;
        },
        enumerable: false,
        configurable: true
    });
    return D;
}());
