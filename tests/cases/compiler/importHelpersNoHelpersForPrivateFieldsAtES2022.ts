// @importHelpers: true
// @target: es2022
// @module: commonjs
// @lib: esnext
// @filename: main.ts
export class Foo {
    #field = true;
    static #staticField = true;
    #method() {}
    static #staticMethod() {}
    get #accessor() { return this.#field; }
    set #accessor(v: boolean) { this.#field = v; }
    accessor #autoAccessor = true;
    static accessor #staticAutoAccessor = true;
    static {
        Foo.#staticField = true;
    }
    f() {
        this.#field = this.#field;
        this.#method();
        Foo.#staticField = Foo.#staticField;
        Foo.#staticMethod();
        this.#accessor = this.#accessor;
        this.#autoAccessor = this.#autoAccessor;
        Foo.#staticAutoAccessor = Foo.#staticAutoAccessor;
        #field in this;
    }
}
