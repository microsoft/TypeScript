// @strict: true
// @noEmit: true

declare const f: 'a' | 'b' | 'c';

switch (true) {
  case f === "a":
  default:
    f;
  case f === "b":
    f;
}
