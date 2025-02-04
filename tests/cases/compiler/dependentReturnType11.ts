// @strict: true, false
// @noEmit: true

// shouldn't crash

type Nullable = null | undefined;

function test1<T extends null>(
  x: T,
): T extends Nullable ? Nullable : never {
  if (x == undefined) {
    return x;
  }
  return x;
}
