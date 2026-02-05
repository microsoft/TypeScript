//// [tests/cases/compiler/metadataOfClassFromAlias.ts] ////

//// [auxiliary.ts]
export class SomeClass {
    field: string;
}

//// [testA.ts]
import { SomeClass } from './auxiliary';
function annotation(): PropertyDecorator {
    return (target: any): void => { };
}
export class ClassA {
    @annotation() aaa: SomeClass;
}

//// [testB.ts]
import { SomeClass } from './auxiliary';
function annotation(): PropertyDecorator {
    return (target: any): void => { };
}
export class ClassB {
    @annotation() bbb: SomeClass | null;
}

//// [auxiliary.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeClass = void 0;
class SomeClass {
    field;
}
exports.SomeClass = SomeClass;
//// [testA.js]
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
const auxiliary_1 = require("./auxiliary");
function annotation() {
    return (target) => { };
}
class ClassA {
    aaa;
}
exports.ClassA = ClassA;
__decorate([
    annotation(),
    __metadata("design:type", auxiliary_1.SomeClass)
], ClassA.prototype, "aaa", void 0);
//// [testB.js]
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
exports.ClassB = void 0;
const auxiliary_1 = require("./auxiliary");
function annotation() {
    return (target) => { };
}
class ClassB {
    bbb;
}
exports.ClassB = ClassB;
__decorate([
    annotation(),
    __metadata("design:type", auxiliary_1.SomeClass)
], ClassB.prototype, "bbb", void 0);
