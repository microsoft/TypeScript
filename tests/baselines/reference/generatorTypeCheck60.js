//// [generatorTypeCheck60.ts]
function* g() {
    class C extends (yield) {};
}

//// [generatorTypeCheck60.js]
function* g() {
    class C extends (yield) {
    }
    ;
}
