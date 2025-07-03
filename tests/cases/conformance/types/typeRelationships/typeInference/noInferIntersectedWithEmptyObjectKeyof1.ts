// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61091

type Keys = keyof (NoInfer<{ foo: string }> & {}); // "foo"

type LowInfer<T> = T & {};
type PropertyAssigner<TContext> = {
  [K in keyof TContext]?: (context: TContext) => TContext[K];
};
type Source = {
  count: () => number;
};
type Target = PropertyAssigner<LowInfer<NoInfer<{ count: number }>>>;
declare const source: Source;
const target: Target = source; // ok

type ActionFunction<TContext> = {
  (args: { context: TContext }): void;
  _out_TContext?: TContext;
};

type TransitionsConfig<TContext> = Record<
  string,
  {
    actions?: ActionFunction<TContext>;
  }
>;

declare function assign<TContext>(
  assignment: PropertyAssigner<LowInfer<TContext>>,
): ActionFunction<TContext>;

declare function createMachine<TContext>(config: {
  types?: {
    context?: TContext;
  };
  on?: TransitionsConfig<NoInfer<TContext>>;
}): void;

createMachine({
  types: {
    context: {
      count: 0,
    },
  },
  on: {
    FOO: {
      actions: assign({
        count: (context) => context.count + 1,
      }),
    },
  },
});
