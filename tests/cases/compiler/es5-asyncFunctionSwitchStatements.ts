// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function switchStatement0() {
    switch (x) {
        case y: a; break;
        default: b; break;
    }
}

async function switchStatement1() {
    switch (await x) {
        case y: a; break;
        default: b; break;
    }
}

async function switchStatement2() {
    switch (x) {
        case await y: a; break;
        default: b; break;
    }
}

async function switchStatement3() {
    switch (x) {
        case y: await a; break;
        default: b; break;
    }
}

async function switchStatement4() {
    switch (x) {
        case y: a; break;
        default: await b; break;
    }
}

async function switchStatement5() {
    switch (x) {
        case y: a; break;
        case await z: b; break;
    }
}

async function switchStatement6() {
    switch (x) {
        default: c; break;
        case await y: a; break;
        case z: b; break;
    }
}

async function switchStatement7() {
    switch (x) {
        default: c; break;
        case y: a; break;
        case await z: b; break;
    }
}

async function switchStatement8() {
    switch (x) {
        default: c;
        case y: a; break;
        case await z: b; break;
    }
}