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
