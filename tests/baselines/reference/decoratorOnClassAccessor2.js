//// [decoratorOnClassAccessor2.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec public get accessor() { return 1; }
}

//// [decoratorOnClassAccessor2.js]
var __decorate = this.__decorate || function (decorators, kind, target, key, descriptor) {
    var value = descriptor || target;
    if (kind === 1 && !value && typeof Object.getOwnPropertyDescriptor === 'function') value = Object.getOwnPropertyDescriptor(target, key);
    for (var i = decorators.length - 1; i >= 0; i--) {
        var decorator = decorators[i];
        value = (kind === 0 ? decorator(value) : kind === 1 ? decorator(target, key, value) : decorator(target, key)) || value;
    }
    if (kind === 1 && value && typeof Object.defineProperty === 'function') Object.defineProperty(target, key, value);
    return value;
};
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "accessor", _a = {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    __decorate([dec], 1, C.prototype, "accessor", _a);
    var _a;
    return C;
})();
