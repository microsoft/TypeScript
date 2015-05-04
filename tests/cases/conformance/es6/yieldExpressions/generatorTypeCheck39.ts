//@target: ES6
function decorator(x: any) {
    return y => { };
}
function* g() {
    @decorator(yield 0)
    class C {
        x = yield 0;
    }
}