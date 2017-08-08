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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var C = (function () {
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
    __names(C.prototype, ["public", "static", "public", "static"]);
    return C;
}());
