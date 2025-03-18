//// [tests/cases/compiler/castOfAwait.ts] ////

//// [castOfAwait.ts]
async function f() {
    <number> await 0;
    typeof await 0;
    void await 0;
    await void <string> typeof <number> void await 0;
    await await 0;
}


//// [castOfAwait.js]
async function f() {
    await 0;
    typeof await 0;
    void await 0;
    await void typeof void await 0;
    await await 0;
}
