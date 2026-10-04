//// [tests/cases/compiler/generatorES6_6.ts] ////

//// [generatorES6_6.ts]
class C {
  *[Symbol.iterator]() {
    let a = yield 1;
  }
}

//// [generatorES6_6.js]
"use strict";
class C {
    *[Symbol.iterator]() {
        let a = yield 1;
    }
}
