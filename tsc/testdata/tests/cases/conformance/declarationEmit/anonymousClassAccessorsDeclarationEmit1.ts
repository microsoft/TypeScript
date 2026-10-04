// @strict: true
// @target: esnext
// @declaration: true

export abstract class Base {
  accessor a = 1;
}

export function middle(Super = Base) {
  abstract class Middle extends Super {}
  return Middle;
}

class A {
  constructor(...args: any[]) {}
}

export function Mixin<T extends typeof A>(Super: T) {
  return class B extends Super {
    get myName(): string {
      return "B";
    }
    set myName(arg: string) {}
  };
}
