// @lib: es5,es6.array,es6.symbol.wellknown

function f(x: number, y: number, z: number) {
    return Array.from(arguments);
}

f(1, 2, 3);   // no error
let a = ['c', 'd'];
a[Symbol.isConcatSpreadable] = false;