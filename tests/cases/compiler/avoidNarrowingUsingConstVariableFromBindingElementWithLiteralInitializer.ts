// @strict: true
// @noEmit: true

declare const foo: ["a", string, number] | ["b", string, boolean];

export function test(arg: { index?: number }) {
  const { index = 0 } = arg;

  if (foo[index] === "a") {
    foo;
  }
}
