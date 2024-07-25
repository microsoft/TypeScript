//// [tests/cases/compiler/ClassDeclarationWithInvalidConstOnPropertyDeclaration2.ts] ////

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration2.ts]
class C {
    const
    x = 10;
}

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration2.js]
var C = /** @class */ (function () {
    function C() {
        this.x = 10;
    }
    return C;
}());
