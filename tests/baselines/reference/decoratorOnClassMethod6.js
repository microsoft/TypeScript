//// [decoratorOnClassMethod6.ts]
declare function dec(): <T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>;

class C {
    @dec ["method"]() {}
}

//// [decoratorOnClassMethod6.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
class C {
    [_a = "method"]() { }
}
Object.defineProperty(C.prototype, _a,
    __decorate([
        dec
    ], C.prototype, _a, Object.getOwnPropertyDescriptor(C.prototype, _a)));
var _a;
