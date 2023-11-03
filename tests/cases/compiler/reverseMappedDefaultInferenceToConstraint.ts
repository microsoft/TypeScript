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
