// @strict: true
// @noEmit: true

declare function test1(
  arg: { a: (arg: number) => void } & { [k: string]: (arg: any) => void },
): unknown;

test1({
  a: (arg) => {},
  b: (arg) => {},
});

declare function test2(
  arg: { a: (arg: { foo: string }) => void } & {
    [k: string]: (arg: { foo: any }) => void;
  },
): unknown;

test2({
  a: (arg) => {},
  b: (arg) => {},
});

declare function test3(
  arg: { a: () => "foo" } & {
    [k: string]: () => any;
  },
): unknown;

test3({
  a: () => "foo",
  b: () => "bar",
});

test3({
  a: () => "bar",
});

declare function test4(
  arg: { a: () => { prop: "foo" } } & {
    [k: string]: () => { prop: any };
  },
): unknown;

test4({
  a: () => ({ prop: "foo" }),
  b: () => ({ prop: "bar" }),
});

test4({
  a: () => ({ prop: "bar" }),
});
