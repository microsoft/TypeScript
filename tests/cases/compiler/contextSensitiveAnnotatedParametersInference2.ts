// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60047

type Map<T> = {
  [P in keyof T]: T[P] extends boolean ? "boolean" : "other";
};

export function buildCommand<F extends Record<string, unknown>>(builderArgs: {
  func: (p: F) => void;
  params: Map<NoInfer<F>>;
}) {}

type Foo = { foo: boolean };

buildCommand({
  func: function (p: Foo) {},
  params: {
    foo: "boolean",
  },
});

buildCommand({
  func(p: Foo) {},
  params: {
    foo: "boolean",
  },
});

buildCommand({
  func: (p: Foo) => {},
  params: {
    foo: "boolean",
  },
});
