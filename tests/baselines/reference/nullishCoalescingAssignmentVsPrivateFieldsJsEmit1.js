//// [tests/cases/conformance/expressions/nullishCoalescingOperator/nullishCoalescingAssignmentVsPrivateFieldsJsEmit1.ts] ////

//// [nullishCoalescingAssignmentVsPrivateFieldsJsEmit1.ts]
// https://github.com/microsoft/TypeScript/issues/61109

class Cls {
  #privateProp: number | undefined;

  problem() {
    this.#privateProp ??= false ? neverThis() : 20;
  }
}

function neverThis(): never {
  throw new Error("This should really really never happen!");
}


//// [nullishCoalescingAssignmentVsPrivateFieldsJsEmit1.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/61109
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Cls_privateProp;
class Cls {
    constructor() {
        _Cls_privateProp.set(this, void 0);
    }
    problem() {
        __classPrivateFieldSet(this, _Cls_privateProp, __classPrivateFieldGet(this, _Cls_privateProp, "f") ?? (false ? neverThis() : 20), "f");
    }
}
_Cls_privateProp = new WeakMap();
function neverThis() {
    throw new Error("This should really really never happen!");
}
