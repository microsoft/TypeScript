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
