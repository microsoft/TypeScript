//// [parserComputedPropertyName29.ts]
class C {
    // yes ASI
    [e] = id++
    [e2]: number
}

//// [parserComputedPropertyName29.js]
class C {
    constructor() {
        // yes ASI
        this[e] = id++;
    }
}
