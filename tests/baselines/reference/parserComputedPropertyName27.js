//// [parserComputedPropertyName27.ts]
class C {
    // No ASI
    [e]: number = 0
    [e2]: number
}

//// [parserComputedPropertyName27.js]
var _a = e;
class C {
    constructor() {
        // No ASI
        this[_a] = 0[e2];
    }
}
