//// [unusedSingleParameterInMethodDeclaration.ts]
class Dummy {
    public greeter(person: string) {
        var unused = 20;
    }
}

//// [unusedSingleParameterInMethodDeclaration.js]
var Dummy = (function () {
    function Dummy() {
    }
    var proto_1 = Dummy.prototype;
    proto_1.greeter = function (person) {
        var unused = 20;
    };
    return Dummy;
}());
