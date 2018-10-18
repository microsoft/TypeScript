//// [parserComputedPropertyName10.ts]
class C {
   [e] = 1
}

//// [parserComputedPropertyName10.js]
var _a;
class C {
    constructor() {
        this[_a] = 1;
    }
}
_a = e;
