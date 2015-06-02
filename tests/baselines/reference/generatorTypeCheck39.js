//// [generatorTypeCheck39.ts]
function decorator(x: any) {
    return y => { };
}
function* g() {
    @decorator(yield 0)
    class C {
        x = yield 0;
    }
}

//// [generatorTypeCheck39.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
function decorator(x) {
    return y => { };
}
function* g() {
    let C = class {
        constructor() {
            this.x = yield 0;
        }
    };
    C = __decorate([
        decorator(yield 0)
    ], C);
}
