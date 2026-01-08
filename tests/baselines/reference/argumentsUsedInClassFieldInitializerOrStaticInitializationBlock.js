//// [tests/cases/compiler/argumentsUsedInClassFieldInitializerOrStaticInitializationBlock.ts] ////

//// [argumentsUsedInClassFieldInitializerOrStaticInitializationBlock.ts]
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


//// [argumentsUsedInClassFieldInitializerOrStaticInitializationBlock.js]
function A() {
    return /** @class */ (function () {
        function T() {
            this.a = arguments;
        }
        return T;
    }());
}
function A1() {
    return new /** @class */ (function () {
        function T() {
            this.a = arguments;
        }
        return T;
    }());
}
function B() {
    return /** @class */ (function () {
        function T() {
            this.a = { b: arguments };
        }
        return T;
    }());
}
function B1() {
    return new /** @class */ (function () {
        function T() {
            this.a = { b: arguments };
        }
        return T;
    }());
}
function C() {
    return /** @class */ (function () {
        function T() {
            this.a = function () { arguments; };
        }
        return T;
    }());
}
function D() {
    return /** @class */ (function () {
        function T() {
            this.a = function () { return arguments; }; // should error
        }
        return T;
    }());
}
function D1() {
    return /** @class */ (function () {
        function T() {
            this.a = function () {
                arguments; // should error
                var b = function () {
                    return arguments; // should error
                };
                function f() {
                    return arguments; // ok
                }
            };
        }
        return T;
    }());
}
function D2() {
    return /** @class */ (function () {
        function class_1() {
            arguments; // ok
        }
        Object.defineProperty(class_1.prototype, "foo", {
            get: function () {
                return arguments; // ok
            },
            set: function (foo) {
                arguments; // ok
            },
            enumerable: false,
            configurable: true
        });
        class_1.prototype.bar = function () {
            arguments; // ok
        };
        class_1.prototype[Symbol.iterator] = function () {
            arguments; // ok
        };
        return class_1;
    }());
}
function D3() {
    var _a;
    return _a = /** @class */ (function () {
            function T() {
            }
            return T;
        }()),
        (function () {
            arguments; // should error
            while (1) {
                arguments; // should error
            }
        })(),
        _a;
}
function D4() {
    var _a;
    return _a = /** @class */ (function () {
            function T() {
            }
            return T;
        }()),
        (function () {
            function f() {
                arguments; // ok
            }
        })(),
        _a;
}
function D5() {
    return /** @class */ (function () {
        function T() {
            this.a = (function () { return arguments; })(); // should error
        }
        return T;
    }());
}
function D6() {
    return /** @class */ (function () {
        function T() {
            this.a = function (x) {
                if (x === void 0) { x = arguments; }
            }; // should error
        }
        return T;
    }());
}
function D7() {
    return /** @class */ (function () {
        function T() {
        }
        T.prototype.a = function (x) {
            if (x === void 0) { x = arguments; }
        };
        return T;
    }());
}
