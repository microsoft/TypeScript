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
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.method = function () { };
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
