//// [generatorTypeCheck38.ts]
var yield;
function* g() {
    yield 0;
    var v: typeof yield;
}

//// [generatorTypeCheck38.js]
var yield;
function* g() {
    yield 0;
    var v;
}
