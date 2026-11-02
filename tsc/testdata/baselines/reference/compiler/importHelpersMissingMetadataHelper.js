//// [tests/cases/compiler/importHelpersMissingMetadataHelper.ts] ////

//// [main.ts]
declare function dec(...args: any[]): any;

@dec
export class C {
    constructor(x: number) {}

    @dec
    method(y: string) {}
}

//// [index.d.ts]
export declare function __decorate(...args: any[]): any;

//// [package.json]
{ "name": "tslib", "types": "index.d.ts" }


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
const tslib_1 = require("tslib");
let C = class C {
    constructor(x) { }
    method(y) { }
};
exports.C = C;
tslib_1.__decorate([
    dec,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], C.prototype, "method", null);
exports.C = C = tslib_1.__decorate([
    dec,
    tslib_1.__metadata("design:paramtypes", [Number])
], C);
