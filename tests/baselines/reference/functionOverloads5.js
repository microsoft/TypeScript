//// [functionOverloads5.ts]
class baz { 
  public foo();
  private foo(bar?:any){ }
}


//// [functionOverloads5.js]
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
var baz = (function () {
    function baz() {
    }
    baz.prototype.foo = function (bar) { };
    __names(baz.prototype, ["foo"]);
    return baz;
}());
