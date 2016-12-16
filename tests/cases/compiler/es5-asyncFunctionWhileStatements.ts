// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function whileStatement0() {
    while (x) { y; }
}

async function whileStatement1() {
    while (await x) { y; }
}

async function whileStatement2() {
    while (x) { await y; }
}

async function whileStatement3() {
    while (x) { continue; }
}

async function whileStatement4() {
    while (await x) { continue; }
}

async function whileStatement5() {
    while (x) { await y; continue; }
}

async function whileStatement6() {
    while (x) { if (1) continue; await y; }
}

async function whileStatement7() {
    A: while (x) { continue A; }
}

async function whileStatement8() {
    B: while (await x) { continue B; }
}

async function whileStatement9() {
    C: while (x) { await y; continue C; }
}

async function whileStatement10() {
    D: while (x) { if (1) continue D; await y; }
}

async function whileStatement11() {
    while (x) { break; }
}

async function whileStatement12() {
    while (await x) { break; }
}

async function whileStatement13() {
    while (x) { await y; break; }
}

async function whileStatement14() {
    while (x) { if (1) break; await y; }
}

async function whileStatement15() {
    E: while (x) { break E; }
}

async function whileStatement16() {
    F: while (await x) { break F; }
}

async function whileStatement17() {
    G: while (x) { await y; break G; }
}

async function whileStatement18() {
    H: while (x) { if (1) break H; await y; }
}