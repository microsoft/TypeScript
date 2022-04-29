//// [privateNameMethodClassExpression.ts]
const C = class {
    #field = this.#method();
    #method() { return 42; }
    static getInstance() { return new C(); }
    getField() { return this.#field };
}

console.log(C.getInstance().getField());
C.getInstance().#method; // Error
C.getInstance().#field; // Error



//// [privateNameMethodClassExpression.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _C_instances, _C_field, _C_method, _a;
const C = (_a = class {
        constructor() {
            _C_instances.add(this);
            _C_field.set(this, __classPrivateFieldGet(this, _C_instances, "m", _C_method).call(this));
        }
        static getInstance() { return new C(); }
        getField() { return __classPrivateFieldGet(this, _C_field, "f"); }
        ;
    },
    _C_field = new WeakMap(),
    _C_instances = new WeakSet(),
    _C_method = function _C_method() { return 42; },
    _a);
console.log(C.getInstance().getField());
C.getInstance().; // Error
C.getInstance().; // Error
