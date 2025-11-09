// @strict: true
// @noEmit: true

declare const partialObj1: Partial<{ a: unknown; b: unknown }>;
declare const partialObj2: Partial<{ c: unknown; d: unknown }>;
declare const someObj1: { x: string };

declare function test1<T>(a: T, b: NoInfer<T> & { prop?: unknown }): void;

test1(partialObj1, someObj1);

declare function test2<T1, T2>(
  a: T1,
  b: T2,
  c: NoInfer<T1> & NoInfer<T2>,
): void;

test2(partialObj1, partialObj2, someObj1);

declare function test3<T1, T2>(
  a: T1,
  b: T2,
  c: NoInfer<T1 & T2>,
): void;

test3(partialObj1, partialObj2, someObj1);
