//// [decoratorOnClassAccessor5.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec public set accessor(value: number) { }
}

//// [decoratorOnClassAccessor5.js]
var __decorate = this.__decorate || function (decorators, target, key) {
    var kind = key == null ? 0 : typeof key == "number" ? 1 : 2, result = target;
    if (kind == 2) result = Object.getOwnPropertyDescriptor(target, typeof key == "symbol" ? key : key = String(key));
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        result = (kind == 0 ? decorator(result) : kind == 1 ? decorator(target, key) : decorator(target, key, result)) || result;
    }
    if (kind == 2 && result) Object.defineProperty(target, key, result);
    if (kind == 0) return result;
};
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "accessor", {
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    __decorate([dec], C.prototype, "accessor");
    return C;
})();
