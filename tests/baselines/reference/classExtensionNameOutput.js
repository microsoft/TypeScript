//// [tests/cases/compiler/classExtensionNameOutput.ts] ////

//// [classExtensionNameOutput.ts]
class A {}
if (true) {
  class B extends A {}

  const foo = function () {
    new B();
  }
}

//// [classExtensionNameOutput.js]
"use strict";
class A {
}
if (true) {
    class B extends A {
    }
    const foo = function () {
        new B();
    };
}
