//// [decoratorOnClassMethod2.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec public method() {}
}

//// [decoratorOnClassMethod2.js]
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
var __metadata = this.__metadata || (typeof Reflect === "object" && Reflect.metadata) || function () { return function() { } };
var C = (function () {
    function C() {
    }
    C.prototype.method = function () {
    };
    Object.defineProperty(C.prototype, "method", __decorate([dec, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', Object)], C.prototype, "method", Object.getOwnPropertyDescriptor(C.prototype, "method")));
    return C;
})();
