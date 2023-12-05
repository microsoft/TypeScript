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
var Foo = function (opts) { return ({}); };
exports.Foo = Foo;


//// [declarationEmitOptionalMethod.d.ts]
export declare const Foo: (opts: {
    a?(): void;
    b?: () => void;
}) => {
    c?(): void;
    d?: () => void;
};
