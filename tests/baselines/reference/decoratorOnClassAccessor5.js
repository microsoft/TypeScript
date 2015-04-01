//// [decoratorOnClassAccessor5.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec public set accessor(value: number) { }
}

//// [decoratorOnClassAccessor5.js]
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "accessor", {
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, "accessor", __decorate([dec], C.prototype, "accessor", Object.getOwnPropertyDescriptor(C.prototype, "accessor")));
    return C;
})();
