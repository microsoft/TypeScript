// @strict: true
// @noEmit: true

declare function outer1(arg: { prop: any }): void;
declare function outer2(arg: { prop: unknown }): void;

declare function inner1<T extends (arg: string) => any>(arg: T): T;

const result1 = inner1((arg) => arg);

outer1({
  prop: inner1((arg) => arg),
});

outer2({
  prop: inner1((arg) => arg),
});

declare function inner2<T>(arg: T & ((arg: string) => any)): T;

const result2 = inner2((arg) => arg);

outer1({
  prop: inner2((arg) => arg),
});

outer2({
  prop: inner2((arg) => arg),
});
