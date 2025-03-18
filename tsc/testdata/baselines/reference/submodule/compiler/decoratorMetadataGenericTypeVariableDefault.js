//// [tests/cases/compiler/decoratorMetadataGenericTypeVariableDefault.ts] ////

//// [decoratorMetadataGenericTypeVariableDefault.ts]
export class C<TypeVariable = string> {
  @Decorate
  member: TypeVariable;
}


//// [decoratorMetadataGenericTypeVariableDefault.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
class C {
    @Decorate
    member;
}
exports.C = C;
