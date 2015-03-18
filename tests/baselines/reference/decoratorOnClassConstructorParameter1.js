//// [decoratorOnClassConstructorParameter1.ts]
<<<<<<< HEAD
declare function dec(target: Function, propertyKey: string | symbol, parameterIndex: number): void;
=======
declare function dec(target: Function, parameterIndex: number): void;
>>>>>>> Updated baselines

class C {
    constructor(@dec p: number) {}
}

//// [decoratorOnClassConstructorParameter1.js]
<<<<<<< HEAD
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
    function C(p) {
    }
    __decorate([dec], C, void 0, 0);
=======
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key) {
    var kind = key == null ? 0 : typeof key == "number" ? 1 : 2, result = target;
    if (kind == 2) result = Object.getOwnPropertyDescriptor(target, typeof key == "symbol" ? key : key = String(key));
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        result = (kind == 0 ? decorator(result) : kind == 1 ? decorator(target, key) : decorator(target, key, result)) || result;
    }
    if (kind == 2 && result) Object.defineProperty(target, key, result);
    if (kind == 0) return result;
};
var __metadata = this.__metadata || (typeof Reflect === "object" && Reflect.metadata) || function (metadataKey, metadataValue) { return function() { } };
var C = (function () {
    function C(p) {
    }
    __decorate([dec, __metadata('design:type', Number)], C, 0);
>>>>>>> Updated baselines
    return C;
})();
