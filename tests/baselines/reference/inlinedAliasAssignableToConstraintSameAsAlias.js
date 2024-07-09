//// [tests/cases/compiler/inlinedAliasAssignableToConstraintSameAsAlias.ts] ////

//// [inlinedAliasAssignableToConstraintSameAsAlias.ts]
interface RelationFields {
  x: A;
  y: A[];
  z: A[];
}
type Name = keyof RelationFields;
type ShouldA<RF extends RelationFields, N extends Name> = RF[N] extends A[]
  ? RF[N][0]
  : never;

class A {
  x: A;
  y: A[];
  z: A[];

  whereRelated< // Works // Type is same as A1, but is not assignable to type A
    RF extends RelationFields = RelationFields,
    N extends Name = Name,
    A1 extends A = RF[N] extends A[] ? RF[N][0] : never,
    A2 extends A = ShouldA<RF, N>
  >(): number {
    return 1;
  }
}


//// [inlinedAliasAssignableToConstraintSameAsAlias.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.whereRelated = function () {
        return 1;
    };
    return A;
}());
