// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/54197

type Bar<K, T extends readonly unknown[]> = T extends readonly [any, ...infer X extends readonly K[]] ? X : never;
type Res1 = Bar<"a" | "b", ["a", "b", "b"]>
