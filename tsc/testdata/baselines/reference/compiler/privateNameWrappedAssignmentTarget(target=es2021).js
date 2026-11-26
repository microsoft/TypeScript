//// [tests/cases/compiler/privateNameWrappedAssignmentTarget.ts] ////

//// [privateNameWrappedAssignmentTarget.ts]
// A private name target wrapped in parentheses, `!`, `as`, `satisfies` or a type assertion is
// still a reference, and must be lowered like the bare target.

declare function other(): C;

class C {
    #x: any = 0;
    static #s: any = 0;
    get #a(): any { return 0; }
    set #a(v: any) {}

    destructuring(arr: any[], obj: any) {
        [(this.#x)] = arr;
        [this.#x!] = arr;
        [(this.#x as any)] = arr;
        [(this.#x satisfies any)] = arr;
        [(<any>this.#x)] = arr;
        [((this.#x))] = arr;
        ({ a: (this.#x) } = obj);
        ({ a: this.#x! } = obj);
        ({ a: (this.#x as any) } = obj);
        [(this.#x) = 1] = arr;
        ({ a: (this.#x as any) = 2 } = obj);
        [, ...(this.#x)] = arr;
        ({ ...(this.#x as any) } = obj);
        [[(this.#x)]] = arr;
        [(other().#x)] = arr;
        [(C.#s)] = arr;
        ({ a: (this.#a as any) } = obj);
    }

    update() {
        (this.#x as any)++;
        --(this.#x as any);
        this.#x!++;
        ++this.#x!;
        (this.#x satisfies any)--;
        (<any>this.#x)++;
        ((this.#x) as any)++;
        const v = (this.#x as any)++;
        (other().#x as any)++;
        (C.#s as any)++;
        (this.#a as any)++;
    }
}


//// [privateNameWrappedAssignmentTarget.js]
"use strict";
// A private name target wrapped in parentheses, `!`, `as`, `satisfies` or a type assertion is
// still a reference, and must be lowered like the bare target.
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _C_instances, _a, _C_x, _C_s, _C_a_get, _C_a_set;
class C {
    constructor() {
        _C_instances.add(this);
        _C_x.set(this, 0);
    }
    destructuring(arr, obj) {
        [(__classPrivateFieldGet(this, _C_x, "f"))] = arr;
        [__classPrivateFieldGet(this, _C_x, "f")] = arr;
        [__classPrivateFieldGet(this, _C_x, "f")] = arr;
        [__classPrivateFieldGet(this, _C_x, "f")] = arr;
        [__classPrivateFieldGet(this, _C_x, "f")] = arr;
        [((__classPrivateFieldGet(this, _C_x, "f")))] = arr;
        ({ a: (__classPrivateFieldGet(this, _C_x, "f")) } = obj);
        ({ a: __classPrivateFieldGet(this, _C_x, "f") } = obj);
        ({ a: __classPrivateFieldGet(this, _C_x, "f") } = obj);
        [(__classPrivateFieldGet(this, _C_x, "f")) = 1] = arr;
        ({ a: __classPrivateFieldGet(this, _C_x, "f") = 2 } = obj);
        [, ...(__classPrivateFieldGet(this, _C_x, "f"))] = arr;
        ({ ...__classPrivateFieldGet(this, _C_x, "f") } = obj);
        [[(__classPrivateFieldGet(this, _C_x, "f"))]] = arr;
        [(__classPrivateFieldGet(other(), _C_x, "f"))] = arr;
        [(__classPrivateFieldGet(_a, _a, "f", _C_s))] = arr;
        ({ a: __classPrivateFieldGet(this, _C_instances, "a", _C_a_get) } = obj);
    }
    update() {
        __classPrivateFieldGet(this, _C_x, "f")++;
        --__classPrivateFieldGet(this, _C_x, "f");
        __classPrivateFieldGet(this, _C_x, "f")++;
        ++__classPrivateFieldGet(this, _C_x, "f");
        __classPrivateFieldGet(this, _C_x, "f")--;
        __classPrivateFieldGet(this, _C_x, "f")++;
        (__classPrivateFieldGet(this, _C_x, "f"))++;
        const v = __classPrivateFieldGet(this, _C_x, "f")++;
        __classPrivateFieldGet(other(), _C_x, "f")++;
        __classPrivateFieldGet(_a, _a, "f", _C_s)++;
        __classPrivateFieldGet(this, _C_instances, "a", _C_a_get)++;
    }
}
_a = C, _C_x = new WeakMap(), _C_instances = new WeakSet(), _C_a_get = function _C_a_get() { return 0; }, _C_a_set = function _C_a_set(v) { };
_C_s = { value: 0 };
