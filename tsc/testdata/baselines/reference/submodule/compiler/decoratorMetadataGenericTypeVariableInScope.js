//// [tests/cases/compiler/decoratorMetadataGenericTypeVariableInScope.ts] ////

//// [decoratorMetadataGenericTypeVariableInScope.ts]
// Unused, but could collide with the named type argument below.
class TypeVariable {}

export class C<TypeVariable> {
  @Decorate
  member: TypeVariable;
}


//// [decoratorMetadataGenericTypeVariableInScope.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
// Unused, but could collide with the named type argument below.
class TypeVariable {
}
class C {
    @Decorate
    member;
}
exports.C = C;
