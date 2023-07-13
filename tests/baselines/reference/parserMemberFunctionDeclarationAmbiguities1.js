//// [tests/cases/conformance/parser/ecmascript5/MemberFunctionDeclarations/parserMemberFunctionDeclarationAmbiguities1.ts] ////

//// [parserMemberFunctionDeclarationAmbiguities1.ts]
class C {
  public() {}
  static() {}

  public public() {}
  public static() {}

  public static public() {}
  public static static() {}
  
  static public() {}
  static static() {}
}

//// [parserMemberFunctionDeclarationAmbiguities1.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.public = function () { };
    C.prototype.static = function () { };
    C.prototype.public = function () { };
    C.prototype.static = function () { };
    C.public = function () { };
    C.static = function () { };
    C.public = function () { };
    C.static = function () { };
    return C;
}());
