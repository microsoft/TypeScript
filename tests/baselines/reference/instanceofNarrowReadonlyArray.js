//// [instanceofNarrowReadonlyArray.ts]
// @strict

function narrow(x: readonly number[] | number): readonly number[] {
    if (x instanceof Array) {
        return x;
    } else {
        return [x];
    }
}

//// [instanceofNarrowReadonlyArray.js]
// @strict
function narrow(x) {
    if (x instanceof Array) {
        return x;
    }
    else {
        return [x];
    }
}
