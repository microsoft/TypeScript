//// [tests/cases/compiler/declarationEmitOptionalMethod.ts] ////

//// [declarationEmitOptionalMethod.ts]
export const Foo = (opts: {
    a?(): void,
    b?: () => void,
}): {
    c?(): void,
    d?: () => void,
} => ({  });

//// [declarationEmitOptionalMethod.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const Foo = (opts) => ({});
exports.Foo = Foo;
