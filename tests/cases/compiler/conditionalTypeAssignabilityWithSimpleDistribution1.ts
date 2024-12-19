// @strict: true
// @noEmit: true

type AllKeys<T> = T extends unknown ? keyof T : never;

type WithKeyOfConstraint<T, K extends keyof T> = unknown;
type Test1<T> = WithKeyOfConstraint<T, AllKeys<T>>; // ok

type WithAllKeysConstraint<T, K extends AllKeys<T>> = unknown;
type Test2<T> = WithAllKeysConstraint<T, keyof T>; // ok

declare function test3<T>(
  p1: T,
  p2: T extends unknown ? T & { css?: unknown } : never,
): void;

const wrapper = <P extends object>(props: P) => {
  test3(
    props,
    props, // ok
  );
};
