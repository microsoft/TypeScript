//// [decoratorOnClassConstructorParameter4.ts]
declare function dec(target: Function, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    constructor(public @dec p: number) {}
}

//// [decoratorOnClassConstructorParameter4.js]
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = this.__param || function(index, decorator) { return function (target, key) { decorator(target, key, index); } };
var C = (function () {
    function C(public, p) {
    }
    C = __decorate([
        __param(1, dec)
    ], C);
    return C;
})();
