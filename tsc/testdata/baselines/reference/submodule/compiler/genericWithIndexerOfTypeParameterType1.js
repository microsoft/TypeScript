//// [tests/cases/compiler/genericWithIndexerOfTypeParameterType1.ts] ////

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
class LazyArray {
    objects = {};
    array() {
        return this.objects;
    }
}
var lazyArray = new LazyArray();
var value = lazyArray.array()["test"];
