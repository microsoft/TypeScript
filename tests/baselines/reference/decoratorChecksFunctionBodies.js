//// [decoratorChecksFunctionBodies.ts]

// from #2971
function func(s: string): void {
}

class A {
    @(x => {
        var a = 3;
        func(a);
        return x; 
    })
    m() {

    }
}

//// [decoratorChecksFunctionBodies.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
// from #2971
function func(s) {
}
var A = (function () {
    function A() {
    }
    A.prototype.m = function () {
    };
    Object.defineProperty(A.prototype, "m",
        __decorate([
            (function (x) {
                var a = 3;
                func(a);
                return x;
            })
        ], A.prototype, "m", Object.getOwnPropertyDescriptor(A.prototype, "m")));
    return A;
})();
