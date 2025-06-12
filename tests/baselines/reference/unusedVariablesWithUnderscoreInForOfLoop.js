//// [tests/cases/compiler/unusedVariablesWithUnderscoreInForOfLoop.ts] ////

//// [unusedVariablesWithUnderscoreInForOfLoop.ts]
function t1() {
    for (const [_a, b] of [['key', 1]]) {
        console.log(b);
    }

    for (const [a, _b] of [['key', 1]]) {
        console.log(a);
    }

    for (const [_a, _b] of [['key', 1]]) {}
}


function t2() {
    for (const [_a, b] of [['key', 1]]) {}

    for (const [a, _b] of [['key', 1]]) {}

    for (const [a, b] of [['key', 1]]) {}
}

function t3() {
    for (const [[[_a, b]]] of [[[['key', 1]]]]) {}

    for (const [[[a, _b]]] of [[[['key', 1]]]]) {}

    for (const [[[a, b]]] of [[[['key', 1]]]]) {}
}


//// [unusedVariablesWithUnderscoreInForOfLoop.js]
function t1() {
    for (const [_a, b] of [['key', 1]]) {
        console.log(b);
    }
    for (const [a, _b] of [['key', 1]]) {
        console.log(a);
    }
    for (const [_a, _b] of [['key', 1]]) { }
}
function t2() {
    for (const [_a, b] of [['key', 1]]) { }
    for (const [a, _b] of [['key', 1]]) { }
    for (const [a, b] of [['key', 1]]) { }
}
function t3() {
    for (const [[[_a, b]]] of [[[['key', 1]]]]) { }
    for (const [[[a, _b]]] of [[[['key', 1]]]]) { }
    for (const [[[a, b]]] of [[[['key', 1]]]]) { }
}
