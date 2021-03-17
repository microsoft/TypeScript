//// [privateNameStaticMethodAsync.ts]
const C = class {
    static async #bar() { return await Promise.resolve(42); }
    static async foo() {
        const b = await this.#bar();
        return b + (this.#baz().next().value || 0) + ((await this.#qux().next()).value || 0);
    }
    static *#baz() { yield 42; }
    static async *#qux() {
        yield (await Promise.resolve(42));
    }
    async static *#bazBad() { yield 42; }
}




//// [privateNameStaticMethodAsync.js]
var __classStaticPrivateMethodGet = (this && this.__classStaticPrivateMethodGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn;
};
var _a, _C_bar, _C_baz, _C_qux, _C_bazBad;
const C = (_a = class {
        static async foo() {
            const b = await __classStaticPrivateMethodGet(this, _a, _C_bar).call(this);
            return b + (__classStaticPrivateMethodGet(this, _a, _C_baz).call(this).next().value || 0) + ((await __classStaticPrivateMethodGet(this, _a, _C_qux).call(this).next()).value || 0);
        }
    },
    _C_bar = async function _C_bar() { return await Promise.resolve(42); },
    _C_baz = function* _C_baz() { yield 42; },
    _C_qux = async function* _C_qux() {
        yield (await Promise.resolve(42));
    },
    _C_bazBad = async function* _C_bazBad() { yield 42; },
    _a);
