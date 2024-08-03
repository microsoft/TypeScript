// @strict: true
// @noEmit: true

type TypeMap = {
  str: "a" | "b" | "c";
  num: 1 | 2 | 3;
};

declare function test1<
  T extends { [K in keyof TypeMap]: TypeMap[K][] } & { [k: string]: any[] },
>(arg: T): T;

const result = test1({
  num: [1, 2],
  str: ["a", "b"],
  bool: [true, false],
});

declare function test2(a: { type: "foo" | "bar" } & { type: any }): void;

test2({ type: "foo" });

// https://github.com/microsoft/TypeScript/issues/59473

const x: { ml: any } & { ml: 'edge' } = { ml: 'edge' };
const a: [any] & [1] = [1];
const b: any[] & 1[] = [1, 1];
const c: { a: any } & { a: 1 } = { a: 1 };
const d: (() => { a: 1 }) & (() => { a: any }) = () => ({
  a: 1,
});
