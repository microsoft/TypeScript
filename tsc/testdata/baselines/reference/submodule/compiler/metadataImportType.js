//// [tests/cases/compiler/metadataImportType.ts] ////

//// [metadataImportType.ts]
export class A {
    @test
    b: import('./b').B
}

//// [metadataImportType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
    @test
    b;
}
exports.A = A;
