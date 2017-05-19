//// [parserConstructorDeclaration1.ts]
class C {
 public constructor() { }
}

//// [parserConstructorDeclaration1.js]
var C = (function () {
    function C() {
    }
    return C;
}());
