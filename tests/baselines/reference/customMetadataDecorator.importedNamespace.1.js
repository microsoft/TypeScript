//// [tests/cases/conformance/decorators/decoratorMetadata/customMetadataDecorator.importedNamespace.1.ts] ////

//// [global.d.ts]
declare module "foo" {
    namespace Reflect {
        const metadata: any;
    }
}
declare const dec: any;
//// [main.ts]
@dec
class C {
    @dec x!: number;

    constructor(x: number) {}

    @dec
    method(@dec x: number): string { return ""; }

    @dec
    get accessor(): string { return ""; }
}
export {};

//// [main.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Reflect as Reflect_1 } from "foo";
let C = class C {
    constructor(x) { }
    method(x) { return ""; }
    get accessor() { return ""; }
};
__decorate([
    dec,
    Reflect_1.metadata("design:type", Number)
], C.prototype, "x", void 0);
__decorate([
    dec,
    __param(0, dec),
    Reflect_1.metadata("design:type", Function),
    Reflect_1.metadata("design:paramtypes", [Number]),
    Reflect_1.metadata("design:returntype", String)
], C.prototype, "method", null);
__decorate([
    dec,
    Reflect_1.metadata("design:type", String),
    Reflect_1.metadata("design:paramtypes", [])
], C.prototype, "accessor", null);
C = __decorate([
    dec,
    Reflect_1.metadata("design:paramtypes", [Number])
], C);
