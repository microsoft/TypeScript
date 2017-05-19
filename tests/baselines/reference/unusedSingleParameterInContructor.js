//// [unusedSingleParameterInContructor.ts]
class Dummy {
    constructor(person: string) {
        var unused = 20;
    }
}

//// [unusedSingleParameterInContructor.js]
var Dummy = (function () {
    function Dummy(person) {
        var unused = 20;
    }
    return Dummy;
}());
