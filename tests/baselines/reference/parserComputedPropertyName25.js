//// [parserComputedPropertyName25.ts]
class C {
    // No ASI
    [e] = 0
    [e2] = 1
}

//// [parserComputedPropertyName25.js]
var _a;
class C {
    constructor() {
        // No ASI
        this[_a] = 0[e2] = 1;
    }
}
_a = e;
