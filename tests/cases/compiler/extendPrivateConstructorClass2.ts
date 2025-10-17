// @strict: true
// @noEmit: true

class A1 {
  private constructor(arg: string) {}
}
class B1 {
  constructor(arg: number) {}
}

declare const Cls1: typeof A1 & typeof B1;

new Cls1(42); // error
class Derived1 extends Cls1 {} // error

class A2 {
  constructor(arg: string) {}
}
class B2 {
  private constructor(arg: number) {}
}

declare const Cls2: typeof A2 & typeof B2;

new Cls2(42); // error
class Derived2 extends Cls2 {} // error

// https://github.com/microsoft/TypeScript/issues/62614
declare abstract class j1 {
  private constructor(...args: any[]);
}
declare abstract class j2 {
  private constructor(...args: any[]);
}
declare const jS: typeof j1 & typeof j2;
declare class j0 extends jS {} // error

abstract class j3 {
  private constructor(arg: number) {}
  method(_any: any) {
    abstract class j4 {
      private constructor(arg: number) {}
    }

    const jS: typeof j3 & typeof j4 = _any;

    declare class j0 extends jS {} // bizarre but ok
  }
}
