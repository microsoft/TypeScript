//// [generatorTypeCheck61.ts]
function * g() {
    @(yield 0)
    class C {};
}

//// [generatorTypeCheck61.js]
function* g() { }
0;
class C {
}
;
