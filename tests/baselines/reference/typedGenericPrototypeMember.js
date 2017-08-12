//// [typedGenericPrototypeMember.ts]
class List<T> {
   add(item: T) { }
}

List.prototype.add("abc"); // Valid because T is instantiated to any


//// [typedGenericPrototypeMember.js]
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
var List = (function () {
    function List() {
    }
    List.prototype.add = function (item) { };
    __names(List.prototype, ["add"]);
    return List;
}());
List.prototype.add("abc"); // Valid because T is instantiated to any
