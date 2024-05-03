
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

abstract class AbstractClass1 {
  private constructor(arg: string) {}
}

class SomeClass1 {
  private constructor(arg: number) {}
}

const test1: typeof AbstractClass1 = SomeClass1;

abstract class AbstractClass2 {
  private constructor() {}
  private test = 10;
}

class SomeClass2 {
  constructor() {}
}

const test2: typeof AbstractClass2 = SomeClass2;
