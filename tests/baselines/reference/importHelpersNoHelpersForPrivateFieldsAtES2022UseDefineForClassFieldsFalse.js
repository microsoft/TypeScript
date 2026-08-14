//// [tests/cases/compiler/importHelpersNoHelpersForPrivateFieldsAtES2022UseDefineForClassFieldsFalse.ts] ////

//// [main.ts]
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


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    #field = true;
    static #staticField = true;
    #method() { }
    static #staticMethod() { }
    f() {
        this.#field = this.#field;
        this.#method();
        Foo.#staticField = Foo.#staticField;
        Foo.#staticMethod();
        #field in this;
    }
}
exports.Foo = Foo;
