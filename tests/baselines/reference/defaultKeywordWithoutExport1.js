//// [tests/cases/compiler/defaultKeywordWithoutExport1.ts] ////

//// [defaultKeywordWithoutExport1.ts]
declare function decorator(constructor: any): any;

@decorator
default class {}

//// [defaultKeywordWithoutExport1.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1 = __decorate([
        decorator
    ], default_1);
    return default_1;
}());
