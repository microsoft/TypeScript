// @strict: true
// @noemit: true

// This test verifies that the checker doesn't panic when a type predicate
// references a parameter name that doesn't match any actual function parameter.

type TypeA = { kind: 'a' };
type TypeB = { kind: 'b' };
type UnionType = TypeA | TypeB;

function isTypeA(
  _value: UnionType
): value is TypeA {  // "value" doesn't match parameter "_value"
  return true;
}

function test(input: UnionType): void {
  if (isTypeA(input)) {
    console.log(input.kind);
  }
}
