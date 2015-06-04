//@target: ES6
function* g() {
    class C {
        @(yield "")
        m() { }
    };
}