//// [tests/cases/compiler/privateNameTaggedTemplate.ts] ////

//// [privateNameTaggedTemplate.ts]
class Foo {
  #x = 3;
  #y = null as any;
  func() {
    console.log(this.#y`->>${this.#x}<<-`);
  }
}


//// [privateNameTaggedTemplate.js]
"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Foo_x, _Foo_y;
class Foo {
    constructor() {
        _Foo_x.set(this, 3);
        _Foo_y.set(this, null);
    }
    func() {
        console.log(__classPrivateFieldGet(this, _Foo_y, "f").bind(this) `->>${__classPrivateFieldGet(this, _Foo_x, "f")}<<-`);
    }
}
_Foo_x = new WeakMap(), _Foo_y = new WeakMap();
