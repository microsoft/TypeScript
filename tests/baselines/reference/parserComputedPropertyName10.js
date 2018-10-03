//// [parserComputedPropertyName10.ts]
class C {
   [e] = 1
}

//// [parserComputedPropertyName10.js]
class C {
    constructor() {
        this[_a] = 1;
    }
}
_a = e;
var _a;
