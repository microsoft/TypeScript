//// [tests/cases/conformance/decorators/decoratorMetadata/customMetadataDecorator.importedIdentifier.10.ts] ////

//// [global.d.ts]
declare module "foo" {
    const metadata: any;
}
declare const dec: any;
//// [main.ts]
declare const metadata: any;
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
import { metadata as metadata_1 } from "foo";
let C = class C {
    constructor(x) { }
    method(x) { return ""; }
    get accessor() { return ""; }
};
__decorate([
    dec,
    metadata_1("design:type", Number)
], C.prototype, "x", void 0);
__decorate([
    dec,
    __param(0, dec),
    metadata_1("design:type", Function),
    metadata_1("design:paramtypes", [Number]),
    metadata_1("design:returntype", String)
], C.prototype, "method", null);
__decorate([
    dec,
    metadata_1("design:type", String),
    metadata_1("design:paramtypes", [])
], C.prototype, "accessor", null);
C = __decorate([
    dec,
    metadata_1("design:paramtypes", [Number])
], C);
