// @strict: true
// @noEmit: true
// @noUncheckedIndexedAccess: true

declare function invariant(condition: boolean): asserts condition;

function f1(obj: Record<string, string>) {
  invariant("test" in obj);
  return obj.test
}

function f2(obj: Record<string, string>) {
  if ("test" in obj) {
    return obj.test
  }
  return "default"
}


