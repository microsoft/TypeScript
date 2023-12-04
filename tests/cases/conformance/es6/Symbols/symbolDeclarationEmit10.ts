//@target: ES6
//@declaration: true
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed
var obj = {
    get [Symbol.isConcatSpreadable]() { return '' },
    set [Symbol.isConcatSpreadable](x) { }
}