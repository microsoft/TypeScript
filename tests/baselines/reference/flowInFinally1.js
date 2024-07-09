//// [tests/cases/compiler/flowInFinally1.ts] ////

//// [flowInFinally1.ts]
class A {
  constructor() { }
  method() { }
}

let a: A | null = null;

try {
  a = new A();
} finally {
  if (a) {
    a.method();
  }
}

//// [flowInFinally1.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.method = function () { };
    return A;
}());
var a = null;
try {
    a = new A();
}
finally {
    if (a) {
        a.method();
    }
}
