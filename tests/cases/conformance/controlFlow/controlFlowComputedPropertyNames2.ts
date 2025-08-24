// @strict: true
// @noUncheckedIndexedAccess: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61389

const arr: number[] = [1, 2, 3];
const idx: number = 2;
if (idx in arr) {
  const x: number = arr[idx]; // ok
}

const map: Record<string, number> = { a: 1 };
const key: string = "a";
if (key in map) {
  const x: number = map[key]; // ok
}
