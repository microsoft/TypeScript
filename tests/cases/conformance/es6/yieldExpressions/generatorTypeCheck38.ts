//@target: ES6
var yield;
function* g() {
    yield 0;
    var v: typeof yield;
}