// #31485
interface A {
  (this: void, b?: number): void;
}
interface B {
  (this: number, b?: number): void;
}
interface C {
  (i: number): void;
}
declare const fn: A | B | C;
fn(0);
