//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration.ts]
class AtomicNumbers {
  static const H = 1;
}

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration.js]
var AtomicNumbers = (function () {
    function AtomicNumbers() {
    }
    AtomicNumbers.H = 1;
    return AtomicNumbers;
}());
