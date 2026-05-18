// @strict: true

enum E {
  A = NaN,
  B = NaN,
}

const a: E.A = E.B;
const b: E.B = E.A;

enum F {
  X = NaN,
}

const c: E.A = F.X; // Error expected - different enums
