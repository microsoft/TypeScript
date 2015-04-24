//// [classExpressionWithDecorator1.ts]
var v = @decorate class C { static p = 1 };

//// [classExpressionWithDecorator1.js]
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var v = ;
var C = (function () {
    function C() {
    }
    C.p = 1;
    C = __decorate([
        decorate
    ], C);
    return C;
})();
;
