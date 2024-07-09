//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty13.ts] ////

//// [decoratorOnClassProperty13.ts]
declare function dec(target: any, propertyKey: string, desc: PropertyDescriptor): void;

class C {
    @dec accessor prop;
}

//// [decoratorOnClassProperty13.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var _C_prop_accessor_storage;
class C {
    constructor() {
        _C_prop_accessor_storage.set(this, void 0);
    }
    get prop() { return __classPrivateFieldGet(this, _C_prop_accessor_storage, "f"); }
    set prop(value) { __classPrivateFieldSet(this, _C_prop_accessor_storage, value, "f"); }
}
_C_prop_accessor_storage = new WeakMap();
__decorate([
    dec
], C.prototype, "prop", null);
