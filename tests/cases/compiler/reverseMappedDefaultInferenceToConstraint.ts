// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56241

interface ParameterizedObject {
  type: string;
  params?: Record<string, unknown>;
}

declare function setup<
  TContext,
  TGuards extends Record<string, ParameterizedObject["params"] | undefined>,
>(_: {
  types: {
    context: TContext;
  };
  guards: {
    [K in keyof TGuards]: (context: TContext, params: TGuards[K]) => void;
  };
}): TGuards;

const result = setup({
  types: {
    context: {
      count: 100,
    },
  },
  guards: {
    checkFoo: (_, { foo }: { foo: string }) => foo === "foo",
    alwaysTrue: (_) => true,
  },
});

declare function foo<
  T extends Record<PropertyKey, U>,
  U extends number | boolean,
>(
  a: {
    [K in keyof T]: (arg: T[K]) => void;
  },
  b: U,
): T;

declare const num: number;

const result1 = foo(
  {
    a: (arg) => {},
    b: () => {},
  },
  num,
);

const result2 = foo(
  {
    a: (arg: 100) => {},
    b: () => {},
  },
  num,
);
