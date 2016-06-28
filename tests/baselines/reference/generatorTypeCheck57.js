//// [generatorTypeCheck57.ts]
function* g() {
    class C {
        x = yield 0;
    };
}

//// [generatorTypeCheck57.js]
function* g() {
    class C {
        constructor() {
            this.x = yield 0;
        }
    }
    ;
}
