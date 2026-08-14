//// [tests/cases/compiler/importHelpersNoHelpersForPrivateFieldsAtES2022.ts] ////

//// [main.ts]
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


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    #field = true;
    static #staticField = true;
    #method() { }
    static #staticMethod() { }
    get #accessor() { return this.#field; }
    set #accessor(v) { this.#field = v; }
    #autoAccessor_accessor_storage = true;
    get #autoAccessor() { return this.#autoAccessor_accessor_storage; }
    set #autoAccessor(value) { this.#autoAccessor_accessor_storage = value; }
    static #staticAutoAccessor_accessor_storage = true;
    static get #staticAutoAccessor() { return Foo.#staticAutoAccessor_accessor_storage; }
    static set #staticAutoAccessor(value) { Foo.#staticAutoAccessor_accessor_storage = value; }
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
exports.Foo = Foo;
