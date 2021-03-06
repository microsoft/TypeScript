//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration.ts]
class AtomicNumbers {
  static const H = 1;
}

//// [ClassDeclarationWithInvalidConstOnPropertyDeclaration.js]
var AtomicNumbers = /** @class */ (function () {
    function AtomicNumbers() {
    }
    (function () {
        AtomicNumbers.H = 1;
    }).call(AtomicNumbers);
    return AtomicNumbers;
}());
