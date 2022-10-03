//// [objectLiteralComputedNameNoDeclarationError.ts]
const Foo = {
    BANANA: 'banana' as 'banana',
}

export const Baa = {
    [Foo.BANANA]: 1
};

//// [objectLiteralComputedNameNoDeclarationError.js]
"use strict";
var _a;
exports.__esModule = true;
exports.Baa = void 0;
var Foo = {
    BANANA: 'banana'
};
exports.Baa = (_a = {},
    _a[Foo.BANANA] = 1,
    _a);


//// [objectLiteralComputedNameNoDeclarationError.d.ts]
export declare const Baa: {
    banana: number;
};
