//// [instanceofWithPrimitiveUnion.ts]
function foo(x: number | string) {
    if (x instanceof Object) {
        x;
    }
}


//// [instanceofWithPrimitiveUnion.js]
function foo(x) {
    if (x instanceof Object) {
        x;
    }
}
