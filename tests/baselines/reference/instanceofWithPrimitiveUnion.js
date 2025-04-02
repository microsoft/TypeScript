//// [tests/cases/compiler/instanceofWithPrimitiveUnion.ts] ////

//// [instanceofWithPrimitiveUnion.ts]
function test1(x: number | string) {
    if (x instanceof Object) {
        x;
    }
}

function test2(x: (number | string) | number) {
    if (x instanceof Object) {
        x;
    }
}


//// [instanceofWithPrimitiveUnion.js]
function test1(x) {
    if (x instanceof Object) {
        x;
    }
}
function test2(x) {
    if (x instanceof Object) {
        x;
    }
}
