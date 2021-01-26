//// [privateNameReadonly.ts]
const C = class {
    #bar() {}
    foo() {
        this.#bar = console.log("should log this then throw");
    }
}

console.log(new C().foo());


//// [privateNameReadonly.js]
var __classPrivateReadonly = (this && this.__classPrivateReadonly) || function () {
    throw new TypeError("private element is not writable");
};
var _C_bar, _C_instances, _a;
const C = (_a = class {
        constructor() {
            _C_instances.add(this);
        }
        foo() {
            __classPrivateReadonly(this, console.log("should log this then throw"));
        }
    },
    _C_instances = new WeakSet(),
    _C_bar = function _C_bar() { },
    _a);
console.log(new C().foo());
