//// [tests/cases/compiler/moduleNoneErrors.ts] ////

//// [a.ts]
export class Foo {
    foo: string;
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    foo;
}
exports.Foo = Foo;
