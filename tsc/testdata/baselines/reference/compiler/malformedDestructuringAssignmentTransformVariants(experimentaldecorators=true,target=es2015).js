//// [tests/cases/compiler/malformedDestructuringAssignmentTransformVariants.ts] ////

//// [malformedDestructuringAssignmentTransformVariants.ts]
declare function dec(...args: any[]): any;
declare const value: any;

class Base {
    static x: any;
}

@dec
class C extends Base {
    static #x: any;

    static {
        // Invalid array targets must still visit private and super accesses.
        [super.x, 0, this.#x] = value;
        [super.x, 1 + 2, this.#x] = value;
        [super.x, (() => {}), this.#x] = value;
        [super.x, value(), this.#x] = value;
        [super.x, , ...this.#x] = value;

        // Object methods/accessors are not destructuring assignment elements.
        ({ x: super.x, m() {}, private: this.#x } = value);
        ({ x: super.x, get g() { return 1; }, private: this.#x } = value);
        ({ x: super.x, set s(v) {}, private: this.#x } = value);
        ({ x: [super.x, 0, this.#x], m() {} } = value);
    }
}


//// [malformedDestructuringAssignmentTransformVariants.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _C_x;
class Base {
}
let C = _a = class C extends Base {
};
_C_x = { value: void 0 };
(() => {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Invalid array targets must still visit private and super accesses.
    _b = _a, [(void 0).x, 0, ({ set value(_l) { __classPrivateFieldSet(_b, _a, _l, "f", _C_x); } }).value] = value;
    _c = _a, [(void 0).x, 1 + 2, ({ set value(_l) { __classPrivateFieldSet(_c, _a, _l, "f", _C_x); } }).value] = value;
    _d = _a, [(void 0).x, (() => { }), ({ set value(_l) { __classPrivateFieldSet(_d, _a, _l, "f", _C_x); } }).value] = value;
    _e = _a, [(void 0).x, value(), ({ set value(_l) { __classPrivateFieldSet(_e, _a, _l, "f", _C_x); } }).value] = value;
    _f = _a, [(void 0).x, , ...({ set value(_l) { __classPrivateFieldSet(_f, _a, _l, "f", _C_x); } }).value] = value;
    // Object methods/accessors are not destructuring assignment elements.
    (_g = _a, { x: (void 0).x, m() { }, private: ({ set value(_l) { __classPrivateFieldSet(_g, _a, _l, "f", _C_x); } }).value } = value);
    (_h = _a, { x: (void 0).x, get g() { return 1; }, private: ({ set value(_l) { __classPrivateFieldSet(_h, _a, _l, "f", _C_x); } }).value } = value);
    (_j = _a, { x: (void 0).x, set s(v) { }, private: ({ set value(_l) { __classPrivateFieldSet(_j, _a, _l, "f", _C_x); } }).value } = value);
    (_k = _a, { x: [(void 0).x, 0, ({ set value(_l) { __classPrivateFieldSet(_k, _a, _l, "f", _C_x); } }).value], m() { } } = value);
})();
C = __decorate([
    dec
], C);
