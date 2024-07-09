//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod11.ts] ////

//// [decoratorOnClassMethod11.ts]
module M {
    class C {
        decorator(target: Object, key: string): void { }

        @(this.decorator)
        method() { }
    }
}

//// [decoratorOnClassMethod11.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.decorator = function (target, key) { };
        C.prototype.method = function () { };
        __decorate([
            (this.decorator)
        ], C.prototype, "method", null);
        return C;
    }());
})(M || (M = {}));
