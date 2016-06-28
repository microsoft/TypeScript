//// [parserConstructorDeclaration12.ts]
class C {
  constructor<>() { }
  constructor<> () { }
  constructor <>() { }
  constructor <> () { }
  constructor< >() { }
  constructor< > () { }
  constructor < >() { }
  constructor < > () { }
}

//// [parserConstructorDeclaration12.js]
var C = (function () {
    function C() {
    }
    return C;
}());
