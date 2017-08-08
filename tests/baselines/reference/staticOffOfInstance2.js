//// [staticOffOfInstance2.ts]
class List<T> {
    public Blah() {
        this.Foo(); // no error
        List.Foo();
    }
    public static Foo() { }
}


//// [staticOffOfInstance2.js]
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
        this.Foo(); // no error
        List.Foo();
    };
    List.Foo = function () { };
    __names(List.prototype, ["Blah"]);
    return List;
}());
