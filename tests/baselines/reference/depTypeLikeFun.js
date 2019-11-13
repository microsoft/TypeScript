//// [depTypeLikeFun.ts]
type F = {
  t: number,
  f: boolean,
}

type G = {
  a: number,
  b: boolean,
  c: string,
}

type Complex<X extends "t" | "f"> = {
    a: { t: number, f: boolean }[X],
    b: { t: boolean, f: number }[X],
}

function f1<X extends "t" | "f">(x: X): F[X] {
    if (x === "t") {
        // no error
        return 1;
    } else {
        // no error
        return true;
    }
}

function f2<X extends "t" | "f">(x: X): F[X] {
    if (x === "t") {
        // error
        return true;
    } else {
        // error
        return 1;
    }
}

function f3<X extends "a" | "b" | "c">(x: X): G[X] {
    if (x === "a") {
        // no error
        return 1;
    } else {
        if (x === "b") {
            // no error
            return true;
        } else {
            // no error
            return "z";
        }
    }
}

function f4<X extends "t" | "f", Y extends "t" | "f">(x: X, y: Y): F[X] {
    if (y === "t") {
        // error
        return 1;
    } else {
        // error
        return true;
    }
}

function f5<T extends "t" | "f">(str: T, ft: F[T]): F[T] {
    if (str === "t") {
        // error
        const n: number = ft;
        // no error
        return 1;
    } else {
        // no error
        return true;
    }
}

declare var obj: F;
function f6<T extends "t" | "f">(str: T, str2: T): F[T] {
    if (str === "t") {
        // error
        obj[str2] = 2;
        // no error
        return 1;
    } else {
        // no error
        return true;
    }
}

class C7<X  extends "t" | "f"> {
  f7(x: X): F[X] {
      if (x === "t") {
          // error
          return 1;
      } else {
          // error
          return true;
      }
  }
}

function f8<X extends "t" | "f">(x: X): Complex<X> {
    if (x === "t") {
        // no error
        return { a: 1, b: true };
    } else {
        // no error
        return { a: true, b: 1 };
    }
}

function f9<X extends "t" | "f">(x: X): Complex<X> {
  if (x === "t") {
      // error
      return { a: true, b: 1 };
  } else {
      // error
      return { a: 1, b: true };
  }
}

function f10<T extends "t" | "f">(str: T): (ft: F[T]) => F[T] {
  if (str === "t") {
    // error
    return (ft: number) => {
        return 1;
    };
  } else {
    // error
    return (ft: F[T]) => {
        return true;
    };
  }
}

//// [depTypeLikeFun.js]
function f1(x) {
    if (x === "t") {
        // no error
        return 1;
    }
    else {
        // no error
        return true;
    }
}
function f2(x) {
    if (x === "t") {
        // error
        return true;
    }
    else {
        // error
        return 1;
    }
}
function f3(x) {
    if (x === "a") {
        // no error
        return 1;
    }
    else {
        if (x === "b") {
            // no error
            return true;
        }
        else {
            // no error
            return "z";
        }
    }
}
function f4(x, y) {
    if (y === "t") {
        // error
        return 1;
    }
    else {
        // error
        return true;
    }
}
function f5(str, ft) {
    if (str === "t") {
        // error
        var n = ft;
        // no error
        return 1;
    }
    else {
        // no error
        return true;
    }
}
function f6(str, str2) {
    if (str === "t") {
        // error
        obj[str2] = 2;
        // no error
        return 1;
    }
    else {
        // no error
        return true;
    }
}
var C7 = /** @class */ (function () {
    function C7() {
    }
    C7.prototype.f7 = function (x) {
        if (x === "t") {
            // error
            return 1;
        }
        else {
            // error
            return true;
        }
    };
    return C7;
}());
function f8(x) {
    if (x === "t") {
        // no error
        return { a: 1, b: true };
    }
    else {
        // no error
        return { a: true, b: 1 };
    }
}
function f9(x) {
    if (x === "t") {
        // error
        return { a: true, b: 1 };
    }
    else {
        // error
        return { a: 1, b: true };
    }
}
function f10(str) {
    if (str === "t") {
        // error
        return function (ft) {
            return 1;
        };
    }
    else {
        // error
        return function (ft) {
            return true;
        };
    }
}
