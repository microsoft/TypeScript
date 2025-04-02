//// [tests/cases/conformance/async/es2017/await_unaryExpression_es2017_3.ts] ////

//// [await_unaryExpression_es2017_3.ts]
async function bar1() {
    ++await 42; // Error
}

async function bar2() {
    --await 42; // Error
}

async function bar3() {
    var x = 42;
    await x++; // OK but shouldn't need parenthesis
}

async function bar4() {
    var x = 42;
    await x--; // OK but shouldn't need parenthesis
}

//// [await_unaryExpression_es2017_3.js]
async function bar1() {
    ++;
    await 42; // Error
}
async function bar2() {
    --;
    await 42; // Error
}
async function bar3() {
    var x = 42;
    await x++; // OK but shouldn't need parenthesis
}
async function bar4() {
    var x = 42;
    await x--; // OK but shouldn't need parenthesis
}
