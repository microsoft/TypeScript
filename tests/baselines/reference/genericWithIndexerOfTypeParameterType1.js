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
var LazyArray = (function () {
    function LazyArray() {
        this.objects = {};
    }
    var proto_1 = LazyArray.prototype;
    proto_1.array = function () {
        return this.objects;
    };
    return LazyArray;
}());
var lazyArray = new LazyArray();
var value = lazyArray.array()["test"]; // used to be an error
