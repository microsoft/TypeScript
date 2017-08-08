//// [genericWithIndexerOfTypeParameterType1.ts]
class LazyArray<T> {
    private objects = <{ [objectId: string]: T; }>{};
    array() {
        return this.objects;
    }
}
var lazyArray = new LazyArray<string>();
var value: string = lazyArray.array()["test"]; // used to be an error

//// [genericWithIndexerOfTypeParameterType1.js]
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
var LazyArray = (function () {
    function LazyArray() {
        this.objects = {};
    }
    LazyArray.prototype.array = function () {
        return this.objects;
    };
    __names(LazyArray.prototype, ["array"]);
    return LazyArray;
}());
var lazyArray = new LazyArray();
var value = lazyArray.array()["test"]; // used to be an error
