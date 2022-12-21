//// [tests/cases/compiler/metadataOfClassFromAlias2.ts] ////

//// [auxiliry.ts]
export class SomeClass {
    field: string;
}

//// [test.ts]
import { SomeClass } from './auxiliry';
function annotation(): PropertyDecorator {
    return (target: any): void => { };
}
export class ClassA {
    @annotation() array: SomeClass | null | string;
}

//// [auxiliry.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeClass = void 0;
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    return SomeClass;
}());
exports.SomeClass = SomeClass;
//// [test.js]
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
exports.ClassA = void 0;
function annotation() {
    return function (target) { };
}
var ClassA = /** @class */ (function () {
    function ClassA() {
    }
    __decorate([
        annotation(),
        __metadata("design:type", Object)
    ], ClassA.prototype, "array", void 0);
    return ClassA;
}());
exports.ClassA = ClassA;
