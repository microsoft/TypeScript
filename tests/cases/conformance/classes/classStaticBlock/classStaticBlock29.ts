// @strict: true
// @target: esnext
// @noEmit: true

class C {
  static {
    const o1 = { [await 1]: '' };
    const o2 = { [await 1]() { return ''; } };
    const o3 = { get [await 1]() { return ''; } };
  }
}
