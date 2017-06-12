//// [unusedMultipleParameters1InMethodDeclaration.ts]
class Dummy {
    public greeter(person: string, person2: string) {
        var unused = 20;
        person2 = "dummy value";
    }
}

//// [unusedMultipleParameters1InMethodDeclaration.js]
var Dummy = (function () {
    function Dummy() {
    }
    var proto_1 = Dummy.prototype;
    proto_1.greeter = function (person, person2) {
        var unused = 20;
        person2 = "dummy value";
    };
    return Dummy;
}());
