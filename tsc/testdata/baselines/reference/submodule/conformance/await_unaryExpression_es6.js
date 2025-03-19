//// [tests/cases/conformance/async/es6/await_unaryExpression_es6.ts] ////

//// [await_unaryExpression_es6.ts]
async function bar() {
    !await 42; // OK
}

async function bar1() {
    +await 42; // OK
}

async function bar3() {
    -await 42; // OK
}

async function bar4() {
    ~await 42; // OK
}

//// [await_unaryExpression_es6.js]
async function bar() {
    !await 42; // OK
}
async function bar1() {
    +await 42; // OK
}
async function bar3() {
    -await 42; // OK
}
async function bar4() {
    ~await 42; // OK
}
