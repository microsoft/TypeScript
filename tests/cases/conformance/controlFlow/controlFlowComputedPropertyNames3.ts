// @strict: true
// @noEmit: true
// @noUncheckedIndexedAccess: true

function goThroughArray() {
  const a: number[] = [1, 2, 3];
  for (let i = 0; i < a.length; i++) {
    if (typeof a[i] === "number") {
      a[i]++;
    }
  }
}
