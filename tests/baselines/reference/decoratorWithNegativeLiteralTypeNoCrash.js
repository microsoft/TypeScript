//// [decoratorWithNegativeLiteralTypeNoCrash.ts]
class A {
    @decorator
    public field1: -1 = -1;
}
function decorator(target: any, field: any) {}

//// [decoratorWithNegativeLiteralTypeNoCrash.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var A = /** @class */ (function () {
    function A() {
        this.field1 = -1;
    }
    __decorate([
        decorator,
        __metadata("design:type", Number)
    ], A.prototype, "field1", void 0);
    return A;
}());
function decorator(target, field) { }
