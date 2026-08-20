// @strict: true
// @target: esnext
// @declaration: true

// https://github.com/microsoft/TypeScript/issues/44938

class A {
  constructor(...args: any[]) {}
  get myName(): string {
    return "A";
  }
}

function Mixin<T extends typeof A>(Super: T) {
  return class B extends Super {
    get myName(): string {
      return "B";
    }
  };
}

class C extends Mixin(A) {
  get myName(): string {
    return "C";
  }
}
