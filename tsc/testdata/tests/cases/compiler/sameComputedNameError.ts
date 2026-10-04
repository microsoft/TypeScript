// @noEmit: true

declare const s: unique symbol;

class A {
  [s]: number = 1;
}

class B extends A {
  [s]: string = "x";
}
