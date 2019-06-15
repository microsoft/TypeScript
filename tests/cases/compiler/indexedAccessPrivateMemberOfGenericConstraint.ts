class A {
  private a: number;
}

type B<T extends A> = T["a"];
