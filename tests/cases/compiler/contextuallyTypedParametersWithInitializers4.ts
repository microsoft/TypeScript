// @strict: true
// @noEmit: true

declare function test<
  TContext,
  TMethods extends Record<string, (ctx: TContext, ...args: (1 | 2)[]) => unknown>,
>(context: TContext, methods: TMethods): void;

test(
  {
    count: 0,
  },
  {
    checkLimit: (ctx, max = 3) => {},
  },
);
