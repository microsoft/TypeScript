//@target: ES6
function* g() {
    class C extends (yield 0) { }
}