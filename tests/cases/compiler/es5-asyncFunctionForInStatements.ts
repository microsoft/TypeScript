// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function forInStatement0() {
    for (x in y) { z; }
}

async function forInStatement1() {
    for (x in await y) { z; }
}

async function forInStatement2() {
    for (x in y) { await z; }
}

async function forInStatement3() {
    for ((await x).a in y) { z; }
}

async function forInStatement4() {
    for (x.a in await y) { z; }
}

async function forInStatement5() {
    for (x.a in y) { await z; }
}

async function forInStatement6() {
    for (var a in y) { z; }
}

async function forInStatement7() {
    for (var b in await y) { z; }
}

async function forInStatement8() {
    for (var c in y) { await z; }
}