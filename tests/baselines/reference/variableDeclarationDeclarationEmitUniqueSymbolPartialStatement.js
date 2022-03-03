//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.ts]
const key = Symbol(), value = 12;

export class Foo {
    [key] = value;
}

//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.js]
"use strict";
var _a;
exports.__esModule = true;
exports.Foo = void 0;
var key = Symbol(), value = 12;
var Foo = /** @class */ (function () {
    function Foo() {
        this[_a] = value;
    }
    return Foo;
}());
exports.Foo = Foo;
_a = key;


//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.d.ts]
declare const key: unique symbol;
export declare class Foo {
    [key]: number;
}
export {};
