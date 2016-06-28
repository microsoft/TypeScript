//// [generatorTypeCheck41.ts]
function* g() {
    let x = {
        [yield 0]: 0
    }
}

//// [generatorTypeCheck41.js]
function* g() {
    let x = {
        [yield 0]: 0
    };
}
