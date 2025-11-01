// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62561

function f<T extends unknown[], V extends unknown[]>(
  x: [boolean, ...V, ...T],
  ...args: V
) {
  return x;
}

const a = f([true, 2, "b", true], 1, "a"); // ok

function f2<T extends unknown[], V extends unknown[]>(
  x: [boolean, ...V, ...T, string],
  ...args: V
) {
  return x;
}

const a2 = f2([true, 2, "b", true, "c"], 1, "a"); // ok

function f3<T extends unknown[], V extends unknown[]>(
  x: [boolean, ...V, ...T, string, number],
  ...args: V
) {
  return x;
}

const a3 = f3([true, 2, "b", true, "c", 3], 1, "a"); // ok

function f4<T extends unknown[], V extends unknown[]>(
  x: [boolean, boolean, boolean, ...V, ...T, string, number],
  ...args: V
) {
  return x;
}

const a4 = f4([true, true, true, 2, "b", true, "c", 3], 1, "a"); // ok

function f5<T extends unknown[], V extends unknown[]>(
  x: [boolean, boolean, boolean, ...V, ...T],
  ...args: V
) {
  return x;
}

const a5 = f5([true, true, true, 2, "b", true], 1, "a"); // ok
