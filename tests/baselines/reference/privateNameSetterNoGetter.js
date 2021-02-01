//// [privateNameSetterNoGetter.ts]
const C = class {
    set #x(x) {}
    m() {
        this.#x += 2; // Error
    }
}

console.log(new C().m());


//// [privateNameSetterNoGetter.js]
var __classPrivateWriteonly = (this && this.__classPrivateWriteonly) || function () {
    throw new TypeError("private setter was defined without a getter");
};
var __classPrivateAccessorSet = (this && this.__classPrivateAccessorSet) || function (receiver, instances, fn, value) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to set private accessor on non-instance");
    }
    return fn.call(receiver, value);
};
var _C_x_set, _C_instances, _a;
const C = (_a = class {
        constructor() {
            _C_instances.add(this);
        }
        m() {
            __classPrivateAccessorSet(this, _C_instances, _C_x_set, __classPrivateWriteonly(this) + 2); // Error
        }
    },
    _C_instances = new WeakSet(),
    _C_x_set = function _C_x_set(x) { },
    _a);
console.log(new C().m());
