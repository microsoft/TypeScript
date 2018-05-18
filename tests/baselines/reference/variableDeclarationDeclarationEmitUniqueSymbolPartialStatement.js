//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.ts]
const key = Symbol(), value = 12;

export class Foo {
    [key] = value;
}

//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.js]
"use strict";
exports.__esModule = true;
var _a;
var key = Symbol(), value = 12;
var Foo = /** @class */ (function () {
    function Foo() {
        this[_a] = value;
    }
    return Foo;
}());
_a = key;
exports.Foo = Foo;


//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.d.ts]
declare const key: unique symbol;
export declare class Foo {
    [key]: number;
}
export {};
