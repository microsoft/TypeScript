// @strict: true
// @noEmit: true

type LowInfer<T> = T & {};

type PartialAssigner<TContext, TKey extends keyof TContext> = (
  context: TContext
) => TContext[TKey];

type PropertyAssigner<TContext> = {
  [K in keyof TContext]?: PartialAssigner<TContext, K> | TContext[K];
};

type Meta<TContext> = {
  action: (ctx: TContext) => void
}

interface AssignAction<TContext> {
  type: "xstate.assign";
  exec: (arg: TContext, meta: Meta<TContext>) => void;
}

declare function assign<TContext>(
  assignment: PropertyAssigner<LowInfer<TContext>>
): AssignAction<TContext>;

type Config<TContext> = {
  context: TContext;
  entry?: AssignAction<TContext>;
};

declare function createMachine<TContext>(config: Config<TContext>): void;

createMachine<{ count: number }>({
  context: {
    count: 0,
  },
  entry: assign({
    count: (ctx: { count: number }) => ++ctx.count,
  }),
});
