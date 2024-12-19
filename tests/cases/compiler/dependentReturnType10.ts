// @strict: true
// @noEmit: true

type Nullable = null | undefined;

function test1<T extends unknown>(
  x: T,
): T extends {} ? {} : T extends Nullable ? Nullable : never {
  if (x == undefined) {
    return x;
  } else {
    return x;
  }
}
