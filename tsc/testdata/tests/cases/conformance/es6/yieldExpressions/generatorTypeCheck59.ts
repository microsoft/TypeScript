// @target: ES6
// @experimentalDecorators: true
function* g() {
    class C {
        @(yield "")
        m() { }
    };
}