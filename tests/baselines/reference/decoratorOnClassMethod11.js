//// [decoratorOnClassMethod11.ts]
module M {
    class C {
        decorator(target: Object, key: string): void { }

        @this.decorator
        method() { }
    }
}

//// [decoratorOnClassMethod11.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        C.prototype.decorator = function (target, key) { };
        C.prototype.method = function () { };
        Object.defineProperty(C.prototype, "method",
            __decorate([
                this.decorator
            ], C.prototype, "method", Object.getOwnPropertyDescriptor(C.prototype, "method")));
        return C;
    })();
})(M || (M = {}));
