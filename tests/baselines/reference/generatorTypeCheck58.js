//// [generatorTypeCheck58.ts]
function* g() {
    class C {
        static x = yield 0;
    };
}

//// [generatorTypeCheck58.js]
function* g() {
    class C {
    }
    (function () {
        C.x = yield 0;
    }).call(C);
    ;
}
