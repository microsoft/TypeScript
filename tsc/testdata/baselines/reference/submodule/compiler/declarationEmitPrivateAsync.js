//// [tests/cases/compiler/declarationEmitPrivateAsync.ts] ////

//// [declarationEmitPrivateAsync.ts]
export class Foo {
    private async baz() {
        return;
    }
}

//// [declarationEmitPrivateAsync.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    async baz() {
        return;
    }
}
exports.Foo = Foo;
