//// [templateLiteralsAndDecoratorMetadata.ts]
declare var format: any;
export class Greeter {
  @format("Hello, %s")
  greeting: `boss` | `employee` = `employee`;  //template literals on this line cause the issue
}

//// [templateLiteralsAndDecoratorMetadata.js]
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Greeter = void 0;
var Greeter = /** @class */ (function () {
    function Greeter() {
        this.greeting = "employee"; //template literals on this line cause the issue
    }
    __decorate([
        format("Hello, %s"),
        __metadata("design:type", String)
    ], Greeter.prototype, "greeting");
    return Greeter;
}());
exports.Greeter = Greeter;
