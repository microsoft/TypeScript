//// [tests/cases/compiler/decoratorMetadataGenericTypeVariable.ts] ////

//// [decoratorMetadataGenericTypeVariable.ts]
export class C<TypeVariable> {
  @Decorate
  member: TypeVariable;
}


//// [decoratorMetadataGenericTypeVariable.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
    @Decorate
    member;
}
exports.C = C;
