// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function forOfStatement0() {
    for (x of y) { z; }
}

async function forOfStatement1() {
    for (x of await y) { z; }
}

async function forOfStatement2() {
    for (x of y) { await z; }
}

async function forOfStatement3() {
    for ((await x).a of y) { z; }
}

async function forOfStatement4() {
    for (x.a of await y) { z; }
}

async function forOfStatement5() {
    for (x.a of y) { await z; }
}

async function forOfStatement6() {
    for (var b of y) { z; }
}

async function forOfStatement7() {
    for (var c of await y) { z; }
}

async function forOfStatement8() {
    for (var d of y) { await z; }
}

async function forOfStatement9() {
    for ([x] of await y) { z; }
}

async function forOfStatement10() {
    for ([x] of y) { await z; }
}

async function forOfStatement11() {
    for ([x = await a] of y) { z; }
}

async function forOfStatement12() {
    for ([x = a] of await y) { z; }
}

async function forOfStatement13() {
    for ([x = a] of y) { await z; }
}

async function forOfStatement14() {
    for ({ x } of await y) { z; }
}

async function forOfStatement15() {
    for ({ x } of y) { await z; }
}

async function forOfStatement16() {
    for ({ x = await a } of y) { z; }
}

async function forOfStatement17() {
    for ({ x = a } of await y) { z; }
}

async function forOfStatement18() {
    for ({ x = a } of y) { await z; }
}