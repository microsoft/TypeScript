//// [parserComputedPropertyName29.ts]
class C {
    // yes ASI
    [e] = id++
    [e2]: number
}

//// [parserComputedPropertyName29.js]
var _a = e, _b = e2;
class C {
    constructor() {
        // yes ASI
        this[_a] = id++;
    }
}
