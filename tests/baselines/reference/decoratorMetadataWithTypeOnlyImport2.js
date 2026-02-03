//// [tests/cases/conformance/decorators/decoratorMetadataWithTypeOnlyImport2.ts] ////

//// [services.ts]
export namespace Services {
  export class Service {}
}

//// [index.ts]
import type { Services } from './services';

declare const decorator: any;
export class Main {
  @decorator()
  field: Services.Service;
}


//// [services.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
var Services;
(function (Services) {
    var Service = /** @class */ (function () {
        function Service() {
        }
        return Service;
    }());
    Services.Service = Service;
})(Services || (exports.Services = Services = {}));
//// [index.js]
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
exports.Main = void 0;
var Main = /** @class */ (function () {
    function Main() {
    }
    __decorate([
        decorator(),
        __metadata("design:type", Function)
    ], Main.prototype, "field", void 0);
    return Main;
}());
exports.Main = Main;
