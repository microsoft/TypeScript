//// [unusedMultipleParameters1InMethodDeclaration.ts]
class Dummy {
    public greeter(person: string, person2: string) {
        var unused = 20;
        person2 = "dummy value";
    }
}

//// [unusedMultipleParameters1InMethodDeclaration.js]
var Dummy = /** @class */ (function () {
    function Dummy() {
    }
    Dummy.prototype.greeter = function (person, person2) {
        var unused = 20;
        person2 = "dummy value";
    };
    return Dummy;
}());
