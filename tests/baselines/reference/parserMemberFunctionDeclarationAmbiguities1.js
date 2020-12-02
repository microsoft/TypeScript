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
    var C_prototype = C.prototype;
    C_prototype.public = function () { };
    C_prototype.static = function () { };
    C_prototype.public = function () { };
    C_prototype.static = function () { };
    C.public = function () { };
    C.static = function () { };
    C.public = function () { };
    C.static = function () { };
    return C;
}());
