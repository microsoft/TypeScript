// @importHelpers: true
// @target: es2022
// @useDefineForClassFields: false
// @module: commonjs
// @filename: main.ts
export class Foo {
    #field = true;
    static #staticField = true;
    #method() {}
    static #staticMethod() {}
    f() {
        this.#field = this.#field;
        this.#method();
        Foo.#staticField = Foo.#staticField;
        Foo.#staticMethod();
        #field in this;
    }
}
