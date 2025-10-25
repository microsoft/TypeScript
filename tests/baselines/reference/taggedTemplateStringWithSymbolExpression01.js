//// [tests/cases/compiler/taggedTemplateStringWithSymbolExpression01.ts] ////

//// [taggedTemplateStringWithSymbolExpression01.ts]
// taggedTemplateStringWithSymbolExpression01.ts

declare function foo(template: any, val: symbol): number;
let x!: symbol;

let result: number = foo`${x}`;


//// [taggedTemplateStringWithSymbolExpression01.js]
// taggedTemplateStringWithSymbolExpression01.ts
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.freeze) {
        Object.freeze(Object.defineProperty(cooked, "raw", { value: Object.freeze(raw) }));
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
var x;
var result = foo(__makeTemplateObject(["", ""], ["", ""]), x);
