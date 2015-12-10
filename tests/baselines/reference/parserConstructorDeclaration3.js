//// [parserConstructorDeclaration3.ts]
class C {
  export constructor() { }
}

//// [parserConstructorDeclaration3.js]
var C = (function () {
    function C() {
    }
    return C;
}());
