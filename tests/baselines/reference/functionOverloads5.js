//// [functionOverloads5.ts]
class baz { 
  public foo();
  private foo(bar?:any){ }
}


//// [functionOverloads5.js]
var baz = (function () {
    function baz() {
    }
    var proto_1 = baz.prototype;
    proto_1.foo = function (bar) { };
    return baz;
}());
