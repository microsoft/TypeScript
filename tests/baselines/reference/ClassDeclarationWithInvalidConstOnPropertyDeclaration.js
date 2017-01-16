//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration.ts]
class AtomicNumbers {
  static const H = 1;
}

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration.js]
var AtomicNumbers = (function () {
    function AtomicNumbers() {
    }
    return AtomicNumbers;
}());
AtomicNumbers.H = 1;
