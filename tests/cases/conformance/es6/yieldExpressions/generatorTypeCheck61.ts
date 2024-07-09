// @target: ES6
// @experimentalDecorators: true
function * g() {
    @(yield 0)
    class C {};
}