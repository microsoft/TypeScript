// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function nestedLoops() {
    A: while (x) {
        await y;
        while (z) {
            continue A;
        }
        while (a) {
            continue;
        }
    }
}