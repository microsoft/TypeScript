//// [decoratorMetadata-jsdoc.ts]
declare var decorator: any;

class X {
    @decorator()
    a?: string?;
    @decorator()
    b?: string!;
    @decorator()
    c?: *;
}

const X1 = class {
    @decorator()
    a?: string?;
    @decorator()
    b?: string!;
    @decorator()
    c?: *;
}


//// [decoratorMetadata-jsdoc.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
var X = /** @class */ (function () {
    function X() {
    }
    __decorate([
        decorator(),
        __metadata("design:type", String)
    ], X.prototype, "a", void 0);
    __decorate([
        decorator(),
        __metadata("design:type", String)
    ], X.prototype, "b", void 0);
    __decorate([
        decorator(),
        __metadata("design:type", Object)
    ], X.prototype, "c", void 0);
    return X;
}());
var X1 = (_a = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}()), __decorate([
    decorator(),
    __metadata("design:type", String)
], _a.prototype, "a", void 0), __decorate([
    decorator(),
    __metadata("design:type", String)
], _a.prototype, "b", void 0), __decorate([
    decorator(),
    __metadata("design:type", Object)
], _a.prototype, "c", void 0), _a);
