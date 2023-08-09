//// [tests/cases/compiler/decoratorMetadataElidedImport.ts] ////

//// [observable.d.ts]
export declare class Observable<T> {}

//// [index.ts]
import { Observable } from './observable';

function whatever(a: any, b: any, c: any) {}

class Test {
    foo(
        @whatever arg1: string,
        @whatever arg2: number
    ): Observable<string> {
        return null!;
    }
}


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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("./observable");
function whatever(a, b, c) { }
class Test {
    foo(arg1, arg2) {
        return null;
    }
}
__decorate([
    __param(0, whatever),
    __param(1, whatever),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", observable_1.Observable)
], Test.prototype, "foo", null);
