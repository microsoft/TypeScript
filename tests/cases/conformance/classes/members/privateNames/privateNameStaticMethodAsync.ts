// @target: es2019

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


