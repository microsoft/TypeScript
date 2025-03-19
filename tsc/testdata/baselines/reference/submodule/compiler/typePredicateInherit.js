//// [tests/cases/compiler/typePredicateInherit.ts] ////

//// [typePredicateInherit.ts]
interface A {
  method1(): this is {
    a: 1
  }
  method2(): boolean;
  method3(): this is {
    a: 1
  };
}
class B implements A {
  method1() { }      // should error

  method2() { }   // should error

  method3() {   // should error
    return true
  }
}

class C {
  method1(): this is {
    a: 1
  } {
    return true;
  }

  method2(): this is {
    a: 1
  } {
    return true;
  }

  method3(): this is {
    a: 1
  } {
    return true;
  }
}

class D extends C {
  method1(): void {   // should error
  }

  method2(): this is {  // should ok
    a: 1
  } {
    return true;
  }

  method3(): boolean {  // should error
    return true;
  }
}

//// [typePredicateInherit.js]
class B {
    method1() { } // should error
    method2() { } // should error
    method3() {
        return true;
    }
}
class C {
    method1() {
        return true;
    }
    method2() {
        return true;
    }
    method3() {
        return true;
    }
}
class D extends C {
    method1() {
    }
    method2() {
        return true;
    }
    method3() {
        return true;
    }
}
