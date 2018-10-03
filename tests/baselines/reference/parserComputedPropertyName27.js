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
        this[_a] = 0[e2];
    }
}
_a = e;
var _a;
