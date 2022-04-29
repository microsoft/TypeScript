//@target: ES6
function* g() {
    class C {
        static x = yield 0;
    };
}