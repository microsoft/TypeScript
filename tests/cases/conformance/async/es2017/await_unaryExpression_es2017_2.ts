// @target: es2017

async function bar1() {
    delete await 42;
}

async function bar2() {
    delete await 42;
}

async function bar3() {
    void await 42;
}