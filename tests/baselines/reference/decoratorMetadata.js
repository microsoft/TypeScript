//// [tests/cases/conformance/decorators/decoratorMetadata.ts] ////

//// [service.ts]
export default class Service {
}
//// [component.ts]
import Service from "./service";

declare var decorator: any;

@decorator
class MyComponent {
    constructor(public Service: Service) {
    }
}

//// [service.js]
var Service = (function () {
    function Service() {
    }
    return Service;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Service;
//// [component.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MyComponent = (function () {
    function MyComponent(Service) {
        this.Service = Service;
    }
    MyComponent = __decorate([
        decorator, 
        __metadata('design:paramtypes', [service_1.default])
    ], MyComponent);
    return MyComponent;
})();
