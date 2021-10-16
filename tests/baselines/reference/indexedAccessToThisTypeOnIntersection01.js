//// [indexedAccessToThisTypeOnIntersection01.ts]
interface A {
  a: string;
  getA: this['a'];
}

type T = (A & { a: number })['getA'];

//// [indexedAccessToThisTypeOnIntersection01.js]
