//// [parserComputedPropertyName28.ts]
class C {
    [e]: number = 0;
    [e2]: number
}

//// [parserComputedPropertyName28.js]
var _a = e, _b = e2;
class C {
    constructor() {
        this[_a] = 0;
    }
}
