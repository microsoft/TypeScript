//// [tests/cases/compiler/classDeclarationBlockScoping1.ts] ////

//// [classDeclarationBlockScoping1.ts]
class C {
}

{
    class C {
    }
}

//// [classDeclarationBlockScoping1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
{
    var C_1 = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
}
