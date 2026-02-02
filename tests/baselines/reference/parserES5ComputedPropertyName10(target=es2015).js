//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName10.ts] ////

//// [parserES5ComputedPropertyName10.ts]
class C {
   [e] = 1
}

//// [parserES5ComputedPropertyName10.js]
var _a;
class C {
    constructor() {
        this[_a] = 1;
    }
}
_a = e;
