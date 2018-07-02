//// [binaryArithmetic.ts]
4 | null;
4 | undefined;
undefined | undefined;
null | null;

function f(x: number | undefined, y: number | undefined) {
    x |= y;
    x |= 1;
    x; // TODO: should be `number` now
}


//// [binaryArithmetic.js]
4 | null;
4 | undefined;
undefined | undefined;
null | null;
function f(x, y) {
    x |= y;
    x |= 1;
    x; // TODO: should be `number` now
}
