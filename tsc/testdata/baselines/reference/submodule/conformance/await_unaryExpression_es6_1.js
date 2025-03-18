//// [tests/cases/conformance/async/es6/await_unaryExpression_es6_1.ts] ////

//// [await_unaryExpression_es6_1.ts]
async function bar() {
    !await 42; // OK
}

async function bar1() {
    delete await 42; // OK
}

async function bar2() {
    delete await 42; // OK
}

async function bar3() {
    void await 42;
}

async function bar4() {
    +await 42;
}

//// [await_unaryExpression_es6_1.js]
async function bar() {
    !await 42;
}
async function bar1() {
    delete await 42;
}
async function bar2() {
    delete await 42;
}
async function bar3() {
    void await 42;
}
async function bar4() {
    +await 42;
}
