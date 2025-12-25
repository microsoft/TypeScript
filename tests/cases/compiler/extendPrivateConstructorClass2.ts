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
  private constructor(...args: any[]) {}
  method1() {
    abstract class j4 {
      private constructor(...args: any[]) {}
      method2() {
        const jS: typeof j3 & typeof j4 = null!;

        // bizarre but ok
        class j0 extends jS {
          method1() {}
          method2() {}
        }
      }
    }
  }
}

abstract class j5 {
  private constructor(...args: any[]) {}
  method1() {
    abstract class j6 {
      private constructor(...args: any[]) {}
      method2() {}
    }
    const jS: typeof j5 & typeof j6 = null!;

    // bizarre but ok too given the base is a result of a mixin
    class j0 extends jS {
      method1() {}
      method2() {}
    }
  }
}

abstract class j7 {
  private constructor(arg: string) {}
  method1() {
    abstract class j8 {
      private constructor(arg: number) {}
      method2() {
        const jS: typeof j7 & typeof j8 = null!;

        // error
        class j0 extends jS {
          method1() {}
          method2() {}
        }
      }
    }
  }
}

abstract class j9 {
  private constructor(arg: string) {}
  method1() {
    abstract class j10 {
      private constructor(arg: number) {}
      method2() {}
    }
    const jS: typeof j9 & typeof j10 = null!;

    // error
    class j0 extends jS {
      method1() {}
      method2() {}
    }
  }
}

abstract class j11 {
  private constructor(arg: string) {}
  static {
    abstract class j12 {
      private constructor(arg: number) {}
      static {
        const jS: typeof j11 & typeof j12 = null!;

        // ok
        class j0 extends jS {}
      }
    }
  }
}

abstract class j13 {
  private constructor(arg: string) {}
  static {
    abstract class j14 {
      private constructor(arg: number) {}
    }
    const jS: typeof j13 & typeof j14 = null!;

    // error
    class j0 extends jS {}
  }
}
