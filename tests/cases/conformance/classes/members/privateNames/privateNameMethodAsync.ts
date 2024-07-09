// @target: es2019

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
