//// [tests/cases/compiler/variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.ts] ////

//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.ts]
const key = Symbol(), value = 12;

export class Foo {
    [key] = value;
}

//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.js]
var _a;
const key = Symbol(), value = 12;
export class Foo {
    constructor() {
        this[_a] = value;
    }
}
_a = key;


//// [variableDeclarationDeclarationEmitUniqueSymbolPartialStatement.d.ts]
declare const key: unique symbol;
export declare class Foo {
    [key]: number;
}
export {};
