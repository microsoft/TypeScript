// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/pull/55714#issuecomment-1730223364

type Test = Record<string, unknown>

type Foo<D extends Test> = {
  [P in keyof Test]?: "whatever" extends D ? 1 : 0
};

type T0 = ReturnType<<D extends Test>(t: D) => Foo<D>>
