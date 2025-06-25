// @strict: true
// @strictPropertyInitialization: false
// @target: es6
// @noEmit: true

class A {
  #foo: number;
}

// error
const test: A = new (class {
  #foo: number;
})();
