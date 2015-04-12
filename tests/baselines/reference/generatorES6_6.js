//// [generatorES6_6.ts]
class C {
  *[Symbol.iterator]() {
    let a = yield 1;
  }
}

//// [generatorES6_6.js]
class C {
    *[Symbol.iterator]() {
        let a = yield 1;
    }
}
