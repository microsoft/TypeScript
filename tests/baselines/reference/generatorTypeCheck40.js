//// [generatorTypeCheck40.ts]
function* g() {
    class C extends (yield 0) { }
}

//// [generatorTypeCheck40.js]
function* g() {
    class C extends (yield 0) {
    }
}
