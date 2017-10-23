//// [parserComputedPropertyName33.ts]
class C {
    // No ASI
    [e] = 0
    [e2]() { }
}

//// [parserComputedPropertyName33.js]
var _a = e;
class C {
    constructor() {
        // No ASI
        this[_a] = 0[e2]();
    }
}
{ }
