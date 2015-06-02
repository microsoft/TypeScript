//// [generatorTypeCheck59.ts]
function* g() {
    class C {
        @(yield "")
        m() { }
    };
}

//// [generatorTypeCheck59.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
function* g() {
    class C {
        m() { }
    }
    Object.defineProperty(C.prototype, "m",
        __decorate([
            (yield "")
        ], C.prototype, "m", Object.getOwnPropertyDescriptor(C.prototype, "m")));
    ;
}
