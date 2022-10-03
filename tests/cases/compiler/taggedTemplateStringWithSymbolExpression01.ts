// taggedTemplateStringWithSymbolExpression01.ts

declare function foo(template: any, val: symbol): number;
let x!: symbol;

let result: number = foo`${x}`;
