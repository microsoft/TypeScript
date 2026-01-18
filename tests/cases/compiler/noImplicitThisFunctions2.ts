// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63001

function f1() {
  return () => this;
}

function f2(this: typeof globalThis) {
  return () => this;
}

const f3 = () => this;

function f4(this: typeof globalThis) {
  const inner = () => {
    return () => this;
  };
  return inner;
}

class C1 {
  static method(this: typeof globalThis) {
    return () => this;
  }
}

const obj1 = {
  arr: () => this,
  method(this: typeof globalThis) {
    return () => this;
  },
};
