
class A {}

abstract class B extends A {}

class C extends B {}

var AA : typeof A = B;
var BB : typeof B = A;
var CC : typeof C = B;

new AA;
new BB;
new CC;

// https://github.com/microsoft/TypeScript/issues/57412

// private methods have parameters stripped away in the generated declaration files
abstract class GeneratedConstructable {
  private constructor() {}
}

class MyPrivateClass {
  private privateVal: boolean;
  private constructor(
    public readonly foo: string,
    public readonly bar: string,
  ) {
    this.privateVal = true;
  }
}

export const funcThatAcceptsAnyGeneratedClass = (
  clazz: typeof GeneratedConstructable,
) => {};

funcThatAcceptsAnyGeneratedClass(MyPrivateClass);
