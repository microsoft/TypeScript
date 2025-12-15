//// [tests/cases/compiler/intersectionWithConflictingPrivates2.ts] ////

//// [intersectionWithConflictingPrivates2.ts]
declare class A {
  private a: number;

}
type B = Pick<{ a: number }, 'a'> & A;

//// [intersectionWithConflictingPrivates2.js]
