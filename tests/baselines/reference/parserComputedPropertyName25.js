//// [parserComputedPropertyName25.ts]
class C {
    // No ASI
    [e] = 0
    [e2] = 1
}

//// [parserComputedPropertyName25.js]
class C {
    constructor() {
        // No ASI
        this[e] = 0[e2] = 1;
    }
}
