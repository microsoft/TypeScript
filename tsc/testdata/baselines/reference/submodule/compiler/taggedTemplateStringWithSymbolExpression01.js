//// [tests/cases/compiler/taggedTemplateStringWithSymbolExpression01.ts] ////

//// [taggedTemplateStringWithSymbolExpression01.ts]
// taggedTemplateStringWithSymbolExpression01.ts

declare function foo(template: any, val: symbol): number;
let x!: symbol;

let result: number = foo`${x}`;


//// [taggedTemplateStringWithSymbolExpression01.js]
let x;
let result = foo `${x}`;
