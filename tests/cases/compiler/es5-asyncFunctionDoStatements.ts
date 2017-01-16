// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function doStatement0() {
    do { x; } while (y);
}

async function doStatement1() {
    do { await x; } while (y);
}

async function doStatement2() {
    do { x; } while (await y);
}

async function doStatement3() {
    do { continue; } while (y);
}

async function doStatement4() {
    do { await x; continue; } while (y);
}

async function doStatement5() {
    do { if (1) continue; await x; } while (y);
}

async function doStatement6() {
    do { continue; } while (await y);
}

async function doStatement7() {
    A: do { continue A; } while (y);
}

async function doStatement8() {
    B: do { await x; continue B; } while (y);
}

async function doStatement9() {
    C: do { if (1) continue C; await x; } while (y);
}

async function doStatement10() {
    D: do { continue D; } while (await y);
}

async function doStatement11() {
    do { break; } while (y);
}

async function doStatement12() {
    do { await x; break; } while (y);
}

async function doStatement13() {
    do { if (1) break; await x; } while (y);
}

async function doStatement14() {
    do { break; } while (await y);
}

async function doStatement15() {
    E: do { break E; } while (y);
}

async function doStatement16() {
    F: do { await x; break F; } while (y);
}

async function doStatement17() {
    G: do { if (1) break G; await x; } while (y);
}

async function doStatement18() {
    H: do { break H; } while (await y);
}