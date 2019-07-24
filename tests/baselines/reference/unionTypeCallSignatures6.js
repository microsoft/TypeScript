//// [unionTypeCallSignatures6.ts]
// #31547
type F1 = (this: { a: string }) => void;
type F2 = (this: { b: number }) => void;
declare var f1: F1 | F2;
f1(); // error

type A = { a: string };
type B = { b: number };
type C = { c: string };
type D = { d: number };

interface F3 {
  (this: A): void;
  (this: B): void;
}
interface F4 {
  (this: C): void;
  (this: B): void;
}

declare var x1: A & {
    f: F3 | F4
}
x1.f(); // error

interface F5 {
  (this: C): void;
  (this: B): void;
}
declare var x2: B & {
  f: F3 | F5;
}
x2.f();


//// [unionTypeCallSignatures6.js]
f1(); // error
x1.f(); // error
x2.f();
