//// [duplicateIdentifierDifferentModifiers.ts]
// Not OK
interface B { x; }
interface B { x?; }

// OK
class A {
  public y: string;
}

interface A {
  y: string;
}

// Not OK
class C {
  private y: string;
}

interface C {
  y: string;
}


//// [duplicateIdentifierDifferentModifiers.js]
// OK
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
// Not OK
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
