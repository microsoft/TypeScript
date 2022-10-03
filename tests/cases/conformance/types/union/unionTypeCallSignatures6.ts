type A = { a: string };
type B = { b: number };
type C = { c: string };
type D = { d: number };
type F0 = () => void;

// #31547
type F1 = (this: A) => void;
type F2 = (this: B) => void;
declare var f1: F1 | F2;
f1(); // error
declare var f2: F0 | F1;
f2(); // error

interface F3 {
  (this: A): void;
  (this: B): void;
}
interface F4 {
  (this: C): void;
  (this: D): void;
}
interface F5 {
  (this: C): void;
  (this: B): void;
}

declare var x1: A & C & {
  f0: F0 | F3;
  f1: F1 | F3;
  f2: F1 | F4;
  f3: F3 | F4;
  f4: F3 | F5;
}
x1.f0();
x1.f1();
x1.f2();
x1.f3(); // error
x1.f4(); // error

declare var x2: A & B & {
  f4: F3 | F5;
}
x2.f4();

type F6 = (this: A & B) => void;
declare var f3: F1 | F6;
f3(); // error

interface F7 {
  (this: A & B & C): void;
  (this: A & B): void;
}
declare var f4: F6 | F7;
f4(); // error
