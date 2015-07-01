//// [parserComputedPropertyName27.ts]
class C {
    // No ASI
    [e]: number = 0
    [e2]: number
}

//// [parserComputedPropertyName27.js]
class C {
    constructor() {
        // No ASI
        this[e] = 0[e2];
    }
}
