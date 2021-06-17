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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _C_instances, _C_bar, _C_baz, _C_qux, _a;
const C = (_a = class {
        constructor() {
            _C_instances.add(this);
        }
        async foo() {
            const b = await __classPrivateFieldGet(this, _C_instances, "m", _C_bar).call(this);
            return b + (__classPrivateFieldGet(this, _C_instances, "m", _C_baz).call(this).next().value || 0) + ((await __classPrivateFieldGet(this, _C_instances, "m", _C_qux).call(this).next()).value || 0);
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
