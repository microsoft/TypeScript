//@target: ES6
//@declaration: true
var obj = {
    get [Symbol.isConcatSpreadable]() { return '' },
    set [Symbol.isConcatSpreadable](x) { }
}