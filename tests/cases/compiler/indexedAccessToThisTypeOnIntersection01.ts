interface A {
  a: string;
  getA: this['a'];
}

type T = (A & { a: number })['getA'];