//// [tests/cases/compiler/variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.ts] ////

//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.ts]
const key = Symbol(), value = 12;

export class Foo {
    [key] = value;
}

//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.js]
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const key = Symbol(), value = 12;
class Foo {
    constructor() {
        this[_a] = value;
    }
}
exports.Foo = Foo;
_a = key;


//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.d.ts]
declare const key: unique symbol;
export declare class Foo {
    [key]: number;
}
export {};
