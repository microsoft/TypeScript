//// [unknownTypeArgOnCall.ts]
class Foo<T> {
  public clone<U>() {
   return null;
   }
}
var f = new Foo<number>();
var r = f.clone<Uhhhh>()


//// [unknownTypeArgOnCall.js]
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
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.clone = function () {
        return null;
    };
    __names(Foo.prototype, ["clone"]);
    return Foo;
}());
var f = new Foo();
var r = f.clone();
