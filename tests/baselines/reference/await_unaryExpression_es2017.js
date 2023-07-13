//// [tests/cases/conformance/async/es2017/await_unaryExpression_es2017.ts] ////

//// [await_unaryExpression_es2017.ts]
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

//// [await_unaryExpression_es2017.js]
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
