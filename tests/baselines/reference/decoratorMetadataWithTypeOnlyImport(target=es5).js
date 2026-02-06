//// [tests/cases/conformance/decorators/decoratorMetadataWithTypeOnlyImport.ts] ////

//// [service.ts]
export class Service {
}
//// [component.ts]
import type { Service } from "./service";

declare var decorator: any;

@decorator
class MyComponent {
    constructor(public Service: Service) {
    }

    @decorator
    method(x: this) {
    }
}

//// [service.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
var Service = /** @class */ (function () {
    function Service() {
    }
    return Service;
}());
exports.Service = Service;
//// [component.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
var MyComponent = /** @class */ (function () {
    function MyComponent(Service) {
        this.Service = Service;
    }
    MyComponent.prototype.method = function (x) {
    };
    __decorate([
        decorator,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MyComponent.prototype, "method", null);
    MyComponent = __decorate([
        decorator,
        __metadata("design:paramtypes", [Function])
    ], MyComponent);
    return MyComponent;
}());
