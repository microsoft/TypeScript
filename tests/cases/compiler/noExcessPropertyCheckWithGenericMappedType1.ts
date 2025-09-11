// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56391

type S = { x: "abc" };

function f<T extends S>() {
  type Target = { [k in T["x"]]: number };

  const x: Target = { abc: 1 };
  const y: Target = {};
  const z: Target = { abc: "" };

  const a: Target = { abc: 1, other: 2 };
  const b: Target = { other: 2 };
  const c: Target = { abc: 1, other: "" };
}

function f2<T extends S, T2 extends string>() {
  type Target = { [k in T["x"] | T2]: number };

  const x: Target = { abc: 1 };
  const y: Target = {};
  const z: Target = { abc: "" };

  const a: Target = { abc: 1, other: 2 };
  const b: Target = { other: 2 };
  const c: Target = { abc: 1, other: "" };
}
