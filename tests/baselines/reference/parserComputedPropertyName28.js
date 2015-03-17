//// [parserComputedPropertyName28.ts]
class C {
    [e]: number = 0;
    [e2]: number
}

//// [parserComputedPropertyName28.js]
class C {
    constructor() {
        this[e] = 0;
    }
}
