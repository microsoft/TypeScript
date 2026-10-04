// @importHelpers: true
// @target: es2020
// @module: commonjs
// @lib: esnext
// @moduleResolution: classic
// @filename: main.ts
export class Foo {
    #field = true;
    f() {
        this.#field = this.#field;
        #field in this;
    }
}

// @filename: tslib.d.ts
export {}
