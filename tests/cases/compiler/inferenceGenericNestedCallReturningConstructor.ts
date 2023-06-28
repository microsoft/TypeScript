// @strict: true
// @noEmit: true

interface AssignObject<TContext> {
  new (ctx: TContext): void;
}

declare function assign<TContext>(
  assigner: (ctx: TContext) => void
): AssignObject<TContext>;

declare function createMachine<TContext>(config: {
  context: TContext;
  entry: AssignObject<TContext>;
}): void;

createMachine({
  context: { count: 0 },
  entry: assign((ctx) => {
    ctx // { count: number }
  }),
});
