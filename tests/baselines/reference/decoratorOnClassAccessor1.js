//// [decoratorOnClassAccessor1.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec get accessor() { return 1; }
}

//// [decoratorOnClassAccessor1.js]
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
var __metadata = this.__metadata || (typeof Reflect === "object" && Reflect.metadata) || function (metadataKey, metadataValue) { return function() { } };
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "accessor", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, "accessor", __decorate([dec, __metadata('design:type', Object)], C.prototype, "accessor", Object.getOwnPropertyDescriptor(C.prototype, "accessor")));
    return C;
})();
