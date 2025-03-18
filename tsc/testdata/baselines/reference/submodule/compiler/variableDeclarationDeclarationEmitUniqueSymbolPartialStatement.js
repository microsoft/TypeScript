//// [tests/cases/compiler/variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.ts] ////

//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.ts]
const key = Symbol(), value = 12;

export class Foo {
    [key] = value;
}

//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const key = Symbol(), value = 12;
class Foo {
    [key] = value;
}
exports.Foo = Foo;
