//// [tests/cases/compiler/metadataReferencedWithinFilteredUnion.ts] ////

//// [Class1.ts]
export class Class1 {
}
//// [Class2.ts]
import { Class1 } from './Class1';

function decorate(target: any, propertyKey: string) {
}

export class Class2 {
    @decorate
    get prop(): Class1 | undefined {
        return undefined;
    }
}

//// [Class1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class1 = void 0;
var Class1 = /** @class */ (function () {
    function Class1() {
    }
    return Class1;
}());
exports.Class1 = Class1;
//// [Class2.js]
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
exports.Class2 = void 0;
var Class1_1 = require("./Class1");
function decorate(target, propertyKey) {
}
var Class2 = /** @class */ (function () {
    function Class2() {
    }
    Object.defineProperty(Class2.prototype, "prop", {
        get: function () {
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        decorate,
        __metadata("design:type", Class1_1.Class1),
        __metadata("design:paramtypes", [])
    ], Class2.prototype, "prop", null);
    return Class2;
}());
exports.Class2 = Class2;
