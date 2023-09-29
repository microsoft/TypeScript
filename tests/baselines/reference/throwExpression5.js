//// [tests/cases/conformance/throwExpression/throwExpression5.ts] ////

//// [throwExpression5.ts]
function t1(a: number, b: number, c: number) {
    (throw a ? b : c);
}

function t2(a: number, b: number) {
    (throw a, b);
}

function t3(a: number, b: number) {
    (throw a && b);
}

function t4(a: number, b: number) {
    (throw a || b);
}

function t5(a: number, b: number, c: number) {
    (throw (a ? b : c));
}


//// [throwExpression5.js]
function t1(a, b, c) {
    ((function () {
        throw a;
    })() ? b : c);
}
function t2(a, b) {
    ((function () {
        throw a;
    })(), b);
}
function t3(a, b) {
    ((function () {
        throw a;
    })() && b);
}
function t4(a, b) {
    ((function () {
        throw a;
    })() || b);
}
function t5(a, b, c) {
    ((function () {
        throw (a ? b : c);
    })());
}
