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
class A {
    constructor() { }
    method() { }
}
let a = null;
try {
    a = new A();
}
finally {
    if (a) {
        a.method();
    }
}
