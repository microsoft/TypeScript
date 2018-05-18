var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "angular2/core"], function (require, exports, ng) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyClass1 = /** @class */ (function () {
        function MyClass1(_elementRef) {
            this._elementRef = _elementRef;
        }
        var _a;
        MyClass1 = __decorate([
            foo,
            __metadata("design:paramtypes", [typeof (_a = (typeof ng !== "undefined" && ng).ElementRef) === "function" && _a || Object])
        ], MyClass1);
        return MyClass1;
    }());
    exports.MyClass1 = MyClass1;
});
