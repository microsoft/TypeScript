//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock17.ts] ////

//// [classStaticBlock17.ts]
let friendA: { getX(o: A): number, setX(o: A, v: number): void };

class A {
  #x: number;

  constructor (v: number) {
    this.#x = v;
  }

  getX () {
    return this.#x;
  }

  static {
    friendA = {
      getX(obj) { return obj.#x },
      setX(obj, value) { obj.#x = value }
    };
  }
};

class B {
  constructor(a: A) {
    const x = friendA.getX(a); // ok
    friendA.setX(a, x + 1); // ok
  }
};

const a = new A(41);
const b = new B(a);
a.getX();

//// [classStaticBlock17.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_x;
let friendA;
class A {
    constructor(v) {
        _A_x.set(this, void 0);
        __classPrivateFieldSet(this, _A_x, v, "f");
    }
    getX() {
        return __classPrivateFieldGet(this, _A_x, "f");
    }
}
_A_x = new WeakMap();
(() => {
    friendA = {
        getX(obj) { return __classPrivateFieldGet(obj, _A_x, "f"); },
        setX(obj, value) { __classPrivateFieldSet(obj, _A_x, value, "f"); }
    };
})();
;
class B {
    constructor(a) {
        const x = friendA.getX(a); // ok
        friendA.setX(a, x + 1); // ok
    }
}
;
const a = new A(41);
const b = new B(a);
a.getX();
