// @target: es6
class C {
  *[Symbol.iterator]() {
    let a = yield 1;
  }
}