//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-sourceMap.ts] ////

//// [esDecorators-classDeclaration-sourceMap.ts]
declare var dec: any;

@dec
@dec
class C {
    @dec
    @dec
    method() {}

    @dec
    @dec
    get x() { return 1; }

    @dec
    @dec
    set x(value: number) { }

    @dec
    @dec
    y = 1;

    @dec
    @dec
    accessor z = 1;

    @dec
    @dec
    static #method() {}

    @dec
    @dec
    static get #x() { return 1; }

    @dec
    @dec
    static set #x(value: number) { }

    @dec
    @dec
    static #y = 1;

    @dec
    @dec
    static accessor #z = 1;
}


//// [esDecorators-classDeclaration-sourceMap.js]
"use strict";
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
var _a, _C_method, _C_x_get, _C_x_set, _C_y, _C_z_get, _C_z_set, _C_z_accessor_storage, _C_z_1_accessor_storage;
class C {
    constructor() {
        this.y = 1;
        _C_z_1_accessor_storage = { value: 1 };
    }
    method() { }
    get x() { return 1; }
    set x(value) { }
    #z_accessor_storage = 1;
    get z() { return __classPrivateFieldGet(this, _a, "f", _C_z_1_accessor_storage); }
    set z(value) { __classPrivateFieldSet(this, _a, value, "f", _C_z_1_accessor_storage); }
    static #z_1_accessor_storage = 1;
}
_a = C, _C_z_accessor_storage = new WeakMap(), _C_method = function _C_method() { }, _C_x_get = function _C_x_get() { return 1; }, _C_x_set = function _C_x_set(value) { }, _C_z_get = function _C_z_get() { return __classPrivateFieldGet(_a, _a, "f", _C_z_1_accessor_storage); }, _C_z_set = function _C_z_set(value) { __classPrivateFieldSet(_a, _a, value, "f", _C_z_1_accessor_storage); };
_C_y = { value: 1 };
_C_z_1_accessor_storage = { value: 1 };
//# sourceMappingURL=esDecorators-classDeclaration-sourceMap.js.map

//// [esDecorators-classDeclaration-sourceMap.d.ts]
declare var dec: any;
declare class C {
    #private;
    method(): void;
    get x(): number;
    set x(value: number);
    y: number;
    accessor z: number;
}
//# sourceMappingURL=esDecorators-classDeclaration-sourceMap.d.ts.map