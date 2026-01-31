//// [tests/cases/compiler/es5-asyncFunctionNestedLoops.ts] ////

//// [es5-asyncFunctionNestedLoops.ts]
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

//// [es5-asyncFunctionNestedLoops.js]
function nestedLoops() {
    return __awaiter(this, void 0, void 0, function* () {
        A: while (x) {
            yield y;
            while (z) {
                continue A;
            }
            while (a) {
                continue;
            }
        }
    });
}
