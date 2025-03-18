//// [tests/cases/compiler/objectLiteralComputedNameNoDeclarationError.ts] ////

//// [objectLiteralComputedNameNoDeclarationError.ts]
const Foo = {
    BANANA: 'banana' as 'banana',
}

export const Baa = {
    [Foo.BANANA]: 1
};

//// [objectLiteralComputedNameNoDeclarationError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Baa = void 0;
const Foo = {
    BANANA: 'banana',
};
exports.Baa = {
    [Foo.BANANA]: 1
};
