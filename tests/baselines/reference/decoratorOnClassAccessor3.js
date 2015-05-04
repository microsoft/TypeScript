//// [decoratorOnClassAccessor3.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    public @dec get accessor() { return 1; }
}

//// [decoratorOnClassAccessor3.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "accessor", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, "accessor",
        __decorate([
            dec
        ], C.prototype, "accessor", Object.getOwnPropertyDescriptor(C.prototype, "accessor")));
    return C;
})();
