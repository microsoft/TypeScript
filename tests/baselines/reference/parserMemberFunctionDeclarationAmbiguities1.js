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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.public = function () { };
    proto_1.static = function () { };
    proto_1.public = function () { };
    proto_1.static = function () { };
    C.public = function () { };
    C.static = function () { };
    C.public = function () { };
    C.static = function () { };
    return C;
}());
