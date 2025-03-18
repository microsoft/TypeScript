//// [tests/cases/conformance/async/es6/await_unaryExpression_es6_2.ts] ////

//// [await_unaryExpression_es6_2.ts]
async function bar1() {
    delete await 42;
}

async function bar2() {
    delete await 42;
}

async function bar3() {
    void await 42;
}

//// [await_unaryExpression_es6_2.js]
async function bar1() {
    delete await 42;
}
async function bar2() {
    delete await 42;
}
async function bar3() {
    void await 42;
}
