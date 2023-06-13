//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticMethodAsync.ts] ////

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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _C_bar, _C_baz, _C_qux, _C_bazBad;
const C = (_a = class {
        static async foo() {
            const b = await __classPrivateFieldGet(this, _a, "m", _C_bar).call(this);
            return b + (__classPrivateFieldGet(this, _a, "m", _C_baz).call(this).next().value || 0) + ((await __classPrivateFieldGet(this, _a, "m", _C_qux).call(this).next()).value || 0);
        }
    },
    _C_bar = async function _C_bar() { return await Promise.resolve(42); },
    _C_baz = function* _C_baz() { yield 42; },
    _C_qux = async function* _C_qux() {
        yield (await Promise.resolve(42));
    },
    _C_bazBad = async function* _C_bazBad() { yield 42; },
    _a);
