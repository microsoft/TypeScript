// @strict: true
// @noEmit: true

interface Action<TContext> {
  new (ctx: TContext): void;
}

declare class AssignAction<TContext> {
  constructor(ctx: TContext);
}

declare function assign<TContext>(
  assigner: (ctx: TContext) => void
): {
  new (ctx: TContext): AssignAction<TContext>;
}

declare function createMachine<TContext>(config: {
  context: TContext;
  entry: Action<TContext>;
}): void;

createMachine({
  context: { count: 0 },
  entry: assign((ctx) => {
    ctx // { count: number }
  }),
});
