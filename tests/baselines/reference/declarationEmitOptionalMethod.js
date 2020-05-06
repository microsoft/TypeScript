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
exports.__esModule = true;
exports.Foo = void 0;
exports.Foo = function (opts) { return ({}); };


//// [declarationEmitOptionalMethod.d.ts]
export declare const Foo: (opts: {
    a?(): void;
    b?: () => void;
}) => {
    c?(): void;
    d?: () => void;
};
