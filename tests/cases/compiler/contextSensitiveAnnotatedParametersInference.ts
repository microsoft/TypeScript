// @strict: true
// @noEmit: true

declare function test<T, A, B>(obj: {
  ctx: T;
  a: (a: A, ctx: T) => void;
  b: (b: B, ctx: T, a: A) => void;
}): void;

test({
  ctx: 'foo',
  a: (a: string, ctx) => {},
  b: (b: string, ctx, a) => {},
});

test({
  ctx: 'foo',
  b: (b: string, ctx, a) => {},
  a: (a: string, ctx) => {},
});
