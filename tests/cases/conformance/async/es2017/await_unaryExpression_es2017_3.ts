// @target: es2017

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