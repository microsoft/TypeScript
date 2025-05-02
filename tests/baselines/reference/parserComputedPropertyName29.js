//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName29.ts] ////

//// [parserComputedPropertyName29.ts]
class C {
    // yes ASI
    [e] = id++
    [e2]: number
}

//// [parserComputedPropertyName29.js]
var _a;
class C {
    constructor() {
        // yes ASI
        this[_a] = id++;
    }
}
_a = e;
