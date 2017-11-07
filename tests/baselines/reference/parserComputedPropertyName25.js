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
        this[_a] = 0[e2] = 1;
    }
}
_a = e;
var _a;
