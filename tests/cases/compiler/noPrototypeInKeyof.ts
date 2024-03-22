class X {
  static K = "";
}
type T = keyof typeof X;
// Should error.
const m: T = "prototype";
