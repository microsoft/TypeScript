//// [tests/cases/compiler/publicGetterProtectedSetterFromThisParameter.ts] ////

//// [publicGetterProtectedSetterFromThisParameter.ts]
class A {
  get x() { return 0; }
  protected set x(v: number) { }

  public get y() { return 0; }
  protected set y(v: number) { }
}

class B {
  get q() { return 0; }
  protected set q(v: number) { }

  protected get u() { return 0; }
  protected set u(v: number) { }

  foo(this: A, a: A, b: B) {
    // Should have no errors in this block
    this.x = 0;
    this.y = 0;
    a.x = 0;
    a.y = 0;
    b.q = 0;
    b.u = 0;
  }
}

function bar(this: A, a: A, b: B) {
    this.x = 0;
    this.y = 0;
    a.x = 0;
    a.y = 0;
    // These should error
    b.q = 0;
    b.u = 0;
}


//// [publicGetterProtectedSetterFromThisParameter.js]
var A = /** @class */ (function () {
    function A() {
    }
    Object.defineProperty(A.prototype, "x", {
        get: function () { return 0; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(A.prototype, "y", {
        get: function () { return 0; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    Object.defineProperty(B.prototype, "q", {
        get: function () { return 0; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(B.prototype, "u", {
        get: function () { return 0; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    B.prototype.foo = function (a, b) {
        // Should have no errors in this block
        this.x = 0;
        this.y = 0;
        a.x = 0;
        a.y = 0;
        b.q = 0;
        b.u = 0;
    };
    return B;
}());
function bar(a, b) {
    this.x = 0;
    this.y = 0;
    a.x = 0;
    a.y = 0;
    // These should error
    b.q = 0;
    b.u = 0;
}
