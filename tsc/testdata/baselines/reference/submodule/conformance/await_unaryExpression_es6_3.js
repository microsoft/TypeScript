//// [tests/cases/conformance/async/es6/await_unaryExpression_es6_3.ts] ////

//// [await_unaryExpression_es6_3.ts]
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

//// [await_unaryExpression_es6_3.js]
async function bar1() {
    ++;
    await 42;
}
async function bar2() {
    --;
    await 42;
}
async function bar3() {
    var x = 42;
    await x++;
}
async function bar4() {
    var x = 42;
    await x--;
}
