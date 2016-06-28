//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration2.ts]
class C {
    const
    x = 10;
}

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration2.js]
var C = (function () {
    function C() {
        this.x = 10;
    }
    return C;
}());
