//// [unusedMultipleParameters3InMethodDeclaration.ts]

class Dummy {
    public greeter(person: string, person2: string, person3: string) {
        var unused = 20;
        person2 = "dummy value";
    }
}

//// [unusedMultipleParameters3InMethodDeclaration.js]
var Dummy = (function () {
    function Dummy() {
    }
    Dummy.prototype.greeter = function (person, person2, person3) {
        var unused = 20;
        person2 = "dummy value";
    };
    return Dummy;
}());
