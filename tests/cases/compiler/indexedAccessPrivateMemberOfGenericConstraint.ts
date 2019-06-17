class A {
  private a: number;
}

class B {
  private a: string;
}

type X<T extends A> = T["a"];
type Y<T extends A | B> = T["a"];
type Z<T extends A & B> = T["a"];

