//// [tests/cases/compiler/importHelpersNoHelpersForPrivateFields.ts] ////

//// [main.ts]
export class Foo {
    #field = true;
    f() {
        this.#field = this.#field;
        #field in this;
    }
}

//// [tslib.d.ts]
export {}


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    #field = true;
    f() {
        this.#field = this.#field;
        #field in this;
    }
}
exports.Foo = Foo;
