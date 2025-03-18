//// [tests/cases/compiler/decoratorMetadataNoLibIsolatedModulesTypes.ts] ////

//// [decoratorMetadataNoLibIsolatedModulesTypes.ts]
export class B {
    @Decorate
    member: Map<string, number>;
}


//// [decoratorMetadataNoLibIsolatedModulesTypes.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
class B {
    @Decorate
    member;
}
exports.B = B;
