//// [decoratorOnClassConstructorParameter4.ts]
declare function dec(target: Function, parameterIndex: number): void;

class C {
    constructor(public @dec p: number) {}
}

//// [decoratorOnClassConstructorParameter4.js]
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
    function C(public, p) {
    }
    __decorate([dec], 2, C, 1);
    return C;
})();
