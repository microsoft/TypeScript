//// [tests/cases/compiler/unusedSingleParameterInMethodDeclaration.ts] ////

//// [unusedSingleParameterInMethodDeclaration.ts]
class Dummy {
    public greeter(person: string) {
        var unused = 20;
    }
}

//// [unusedSingleParameterInMethodDeclaration.js]
var Dummy = /** @class */ (function () {
    function Dummy() {
    }
    Dummy.prototype.greeter = function (person) {
        var unused = 20;
    };
    return Dummy;
}());
