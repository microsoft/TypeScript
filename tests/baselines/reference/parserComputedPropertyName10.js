//// [parserComputedPropertyName10.ts]
class C {
   [e] = 1
}

//// [parserComputedPropertyName10.js]
class C {
    constructor() {
        this[e] = 1;
    }
}
