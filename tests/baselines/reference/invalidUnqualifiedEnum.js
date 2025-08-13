//// [tests/cases/compiler/invalidUnqualifiedEnum.ts] ////

//// [invalidUnqualifiedEnum.ts]
export enum Foo {
    bar
}
export namespace Foo {
    export const q = Foo.bar;
}


//// [invalidUnqualifiedEnum.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo;
(function (Foo) {
    Foo[Foo["bar"] = 0] = "bar";
})(Foo || (exports.Foo = Foo = {}));
(function (Foo) {
    Foo.q = Foo.bar;
})(Foo || (exports.Foo = Foo = {}));


//// [invalidUnqualifiedEnum.d.ts]
export declare enum Foo {
    bar = 0
}
export declare namespace Foo {
    const q = Foo.bar;
}
