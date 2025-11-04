// @strict: true
// @noEmit: true

// based on https://github.com/microsoft/TypeScript/issues/51831

type NoMatchAll<K> = Exclude<K, "_">

type Union<T extends object> = {
  [P in keyof T]: ({ [Q in "kind"]: P } & T[P]) extends infer U ? { [Q in keyof U]: U[Q] } : never
}[keyof T]
type UnionMap<U extends { kind: string }> = { [K in U["kind"]]: U extends { kind: K } ? U : never }
type ExhaustivePattern<T extends { kind: string }, R> = { [K in T["kind"] as NoMatchAll<K>]: (u1: UnionMap<T>[K]) => R };
type NonExhaustivePattern<T extends { kind: string }, R> = { [K in T["kind"] as NoMatchAll<K>]?: (u2: UnionMap<T>[K]) => R } & {_: (union: T) => R};
type Pattern<T extends { kind: string }, R> = ExhaustivePattern<T, R> | NonExhaustivePattern<T, R>;

function match<U extends { kind: string }, T>(union: U, pattern: Pattern<NoInfer<U>, T>): T {
  if((pattern as any)[union.kind]) {
    return (pattern as any)[union.kind](union as U) as T
  }
  return (pattern as any)["_"](union as U) as T
}

type ValueType = Union<{
  String: {value: string},
  Number: {value: number},
  Boolean: {value: boolean},
  Date: {value: Date}
}>

function main(value: ValueType) {
  let test1 = match(value, {
    String: ({value}) => value,
    Number: ({value}) => value.toString(),
    _: (token) => "Unknown"
  });
}
