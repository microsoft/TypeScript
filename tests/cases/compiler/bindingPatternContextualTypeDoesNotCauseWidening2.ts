// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56771

declare function fn1<T extends { A: { a: "A"; } | null | undefined }>(t: T): T;
const { A } = fn1({ A: { a: "A" } });
A.a;

declare function fn2<T extends { A: ["a" | "b"] }>(t: T): T;
const { A: [nested] } = fn2({ A: ["a"] });

declare function fn3<T extends { a: unknown; b: unknown }>(obj: T): T;
const { a: [a3] } = fn3({ a: [1, ""], b: "" });

declare function fn4<T extends { a: unknown; b: unknown }[]>(obj: T): T;
const [{ a: a4 }] = fn4([{ a: "", b: 10 }, { a: true, b: "" }]);

declare function fn5<
  O extends { a?: "a"; b?: "b1" | "b2"; c?: "c" }[],
  T extends keyof O[number],
>(
  keys: T[],
  obj?: O,
): {
  [K in keyof O]: Pick<O[K], T>;
}
const [{ b: b5_1 }, { b: b5_2 }] = fn5(["b"], [{ a: "a", b: "b1" }, { b: "b2", c: "c" }]);

declare function fn6<
  O extends { a?: "valA", b?: "valB" | "valC" } | null,
  T extends keyof O
>(
  keys: T[],
  obj?: O,
): Pick<O, T> & { pickedKeys: T };
const { b: b6, pickedKeys } = fn6(["b"], { a: "valA", b: "valB" });

declare function fn7<T extends { [k: string]: 'a' | 'b' }>(obj: T): T
const { a7 } = fn7({ a7: 'a' })