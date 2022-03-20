function A() {
  return class T {
     a = arguments
  }
}

function A1() {
  return new class T {
     a = arguments
  }
}

function B() {
  return class T {
     a = { b: arguments }
  }
}

function B1() {
  return new class T {
     a = { b: arguments }
  }
}

function C() {
  return class T {
     a = function () { arguments }
  }
}

function D() {
  return class T {
     a = () => arguments  // should error
  }
}

function D1() {
  return class T {
    a = () => {
      arguments;    // should error
      const b = () => {
        return arguments;     // should error
      }

      function f() {
        return arguments;      // ok
      }
    }
 }
}

function D2() {
  return class {
    constructor() {
      arguments;  // ok
    }
    get foo() {
      return arguments;  // ok
    }
    set foo(foo: any) {
      arguments;  // ok
    }
    bar() {
      arguments;  // ok
    }
    [Symbol.iterator]() {
      arguments;  // ok
    }
  }
}

function D3() {
  return class T {
    static {
      arguments;  // should error
      while(1) {
        arguments // should error
      }
    }
  }
}

function D4() {
  return class T {
    static {
      function f() {
        arguments;  // ok
      }
    }
  }
}


function D5() {
  return class T {
     a = (() => { return arguments; })()  // should error
  }
}

function D6() {
  return class T {
     a = (x = arguments) => {}    // should error
  }
}

function D7() {
  return class T {
     a(x = arguments){  // ok

     }
  }
}
