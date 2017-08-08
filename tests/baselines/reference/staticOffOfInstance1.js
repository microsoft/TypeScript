//// [staticOffOfInstance1.ts]
class List {
  public Blah() {
    this.Foo();
  }
  public static Foo() {}
}

//// [staticOffOfInstance1.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var List = (function () {
    function List() {
    }
    List.prototype.Blah = function () {
        this.Foo();
    };
    List.Foo = function () { };
    __names(List.prototype, ["Blah"]);
    return List;
}());
