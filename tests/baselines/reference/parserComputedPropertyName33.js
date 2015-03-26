//// [parserComputedPropertyName33.ts]
class C {
    // No ASI
    [e] = 0
    [e2]() { }
}

//// [parserComputedPropertyName33.js]
class C {
    constructor() {
        // No ASI
        this[e] = 0[e2]();
    }
}
{ }
