// @strict: true
// @noEmit: true

declare function test1<
  TContext,
  TMethods extends Record<string, (ctx: TContext, ...args: never[]) => unknown>,
>(context: TContext, methods: TMethods): void;

test1(
  {
    count: 0,
  },
  {
    checkLimit: (ctx, max = 500) => {},
    hasAccess: (ctx, user: { name: string }) => {},
  },
);