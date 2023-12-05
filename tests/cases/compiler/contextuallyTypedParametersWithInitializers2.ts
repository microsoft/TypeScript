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

declare const num: number;
const test2: (arg: 1 | 2) => void = (arg = num) => {};

const test3: (arg: number) => void = (arg = 1) => {};
