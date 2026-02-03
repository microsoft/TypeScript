//// [tests/cases/compiler/unusedMultipleParameter2InContructor.ts] ////

//// [unusedMultipleParameter2InContructor.ts]
class Dummy {
    constructor(person: string, person2: string, person3: string) {
        var unused = 20;
        person2 = "Dummy value";
    }
}

//// [unusedMultipleParameter2InContructor.js]
var Dummy = /** @class */ (function () {
    function Dummy(person, person2, person3) {
        var unused = 20;
        person2 = "Dummy value";
    }
    return Dummy;
}());
