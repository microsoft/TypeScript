//// [privateNameMethodAsync.ts]
const C = class {
    async #bar() { return await Promise.resolve(42); }
    async foo() {
        const b = await this.#bar();
        return b + (this.#baz().next().value || 0) + ((await this.#qux().next()).value || 0);
    }
    *#baz() { yield 42; }
    async *#qux() {
        yield (await Promise.resolve(42));
    }
}

new C().foo().then(console.log);


//// [privateNameMethodAsync.js]
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _C_bar, _C_baz, _C_qux, _C_instances, _a;
const C = (_a = class {
        constructor() {
            _C_instances.add(this);
        }
        async foo() {
            const b = await __classPrivateMethodGet(this, _C_instances, _C_bar).call(this);
            return b + (__classPrivateMethodGet(this, _C_instances, _C_baz).call(this).next().value || 0) + ((await __classPrivateMethodGet(this, _C_instances, _C_qux).call(this).next()).value || 0);
        }
    },
    _C_instances = new WeakSet(),
    _C_bar = async function _C_bar() { return await Promise.resolve(42); },
    _C_baz = function* _C_baz() { yield 42; },
    _C_qux = async function* _C_qux() {
        yield (await Promise.resolve(42));
    },
    _a);
new C().foo().then(console.log);
