//// [generatorTypeCheck42.ts]
function* g() {
    let x = {
        [yield 0]() {

        }
    }
}

//// [generatorTypeCheck42.js]
function* g() {
    let x = {
        [yield 0]() {
        }
    };
}
