// @strict: true

// Both of the following types trigger the recursion limiter in getImmediateBaseConstraint

type T1<B extends { [K in keyof B]: Extract<B[Exclude<keyof B, K>], { val: string }>["val"] }> = B;
type T2<B extends { [K in keyof B]: B[Exclude<keyof B, K>]["val"] }> = B;

// Repros from #22950

type AProp<T extends { a: string }> = T

declare function myBug<
  T extends { [K in keyof T]: T[K] extends AProp<infer U> ? U : never }
>(arg: T): T

const out = myBug({obj1: {a: "test"}})

type Value<V extends string = string> = Record<"val", V>;
declare function value<V extends string>(val: V): Value<V>;

declare function ensureNoDuplicates<
  T extends {
    [K in keyof T]: Extract<T[K], Value>["val"] extends Extract<T[Exclude<keyof T, K>], Value>["val"]
      ? never
      : any
  }
>(vals: T): void;

const noError = ensureNoDuplicates({main: value("test"), alternate: value("test2")});

const shouldBeNoError = ensureNoDuplicates({main: value("test")});

const shouldBeError = ensureNoDuplicates({main: value("dup"), alternate: value("dup")});

// Repro from #26448

type Cond<T> = T extends number ? number : never;
declare function function1<T extends {[K in keyof T]: Cond<T[K]>}>(): T[keyof T]["foo"];
