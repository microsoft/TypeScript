// @target: es6
async function f() {
    <number> await 0;
    typeof await 0;
    void await 0;
    await void <string> typeof <number> void await 0;
    await await 0;
}
