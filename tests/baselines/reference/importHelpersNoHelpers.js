//// [tests/cases/compiler/importHelpersNoHelpers.ts] ////

//// [external.ts]
export * from "./other";
export class A { }
export class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

const o = { a: 1 };
const y = { ...o };
const { ...x } = y;

//// [other.ts]
export const x = 1;

//// [script.ts]
class A { }
class B extends A { }

declare var dec: any;

@dec
class C {
    method(@dec x: number) {
    }
}

//// [tslib.d.ts]
export {}


//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
//// [external.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./other"), exports);
class A {
}
exports.A = A;
class B extends A {
}
exports.B = B;
let C = class C {
    method(x) {
    }
};
tslib_1.__decorate([
    tslib_1.__param(0, dec),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], C.prototype, "method", null);
C = tslib_1.__decorate([
    dec
], C);
const o = { a: 1 };
const y = Object.assign({}, o);
const x = tslib_1.__rest(y, []);
//// [script.js]
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
class A {
}
class B extends A {
}
let C = class C {
    method(x) {
    }
};
__decorate([
    __param(0, dec),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], C.prototype, "method", null);
C = __decorate([
    dec
], C);
