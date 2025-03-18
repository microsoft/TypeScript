//// [tests/cases/compiler/indexedAccessPrivateMemberOfGenericConstraint.ts] ////

//// [indexedAccessPrivateMemberOfGenericConstraint.ts]
class A {
  private a: number;
}

class B {
  private a: string;
}

type X<T extends A> = [T["a"], (T | B)["a"]];
type Y<T extends A | B> = T["a"];
type Z<T extends A & B> = T["a"];


//// [indexedAccessPrivateMemberOfGenericConstraint.js]
class A {
    a;
}
class B {
    a;
}
