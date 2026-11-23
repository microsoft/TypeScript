//// [tests/cases/compiler/jsExpandoUniqueSymbolDeclarationEmit.ts] ////

//// [index.js]
const bar = function () {};
/** @type {unique symbol} */
bar.s = Symbol();
bar.g = () => bar.s;
module.exports = bar;




//// [index.d.ts]
export = bar;
declare function bar(): void;
declare namespace bar {
    var s: symbol;
    var g: () => symbol;
}
