//// [generatorTypeCheck44.ts]
function* g() {
    let x = {
        get [yield 0]() {
            return 0;
        }
    }
}

//// [generatorTypeCheck44.js]
function* g() {
    let x = {
        get [yield 0]() {
            return 0;
        }
    };
}
