//// [decoratorOnClassMethod12.ts]
module M {
    class S {
        decorator(target: Object, key: string): void { }
    }
    class C extends S {
        @super.decorator
        method() { }
    }
}

//// [decoratorOnClassMethod12.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var M;
(function (M) {
    var S = (function () {
        function S() {
        }
        S.prototype.decorator = function (target, key) { };
        return S;
    })();
    var C = (function (_super) {
        __extends(C, _super);
        function C() {
            _super.apply(this, arguments);
        }
        C.prototype.method = function () { };
        Object.defineProperty(C.prototype, "method",
            __decorate([
                _super.decorator
            ], C.prototype, "method", Object.getOwnPropertyDescriptor(C.prototype, "method")));
        return C;
    })(S);
})(M || (M = {}));
