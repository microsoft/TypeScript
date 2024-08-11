// @strict: true
// @lib: esnext

// https://github.com/microsoft/TypeScript/issues/55693
interface MultiKeyMap<Keys extends readonly unknown[], Value> {
  get<Key extends GetKeys<Keys>>(...key: Key): GetResult<Keys, Key, Value>;
}
type GetKeys<Keys extends readonly unknown[]> = Keys extends [
  ...infer Remain,
  infer _,
]
  ? Keys | GetKeys<Remain>
  : Keys;
type GetResult<
  Id extends readonly unknown[],
  Args extends GetKeys<Id>,
  Value,
> = Args extends Id
  ? Value | undefined
  : Id extends [...Args, ...infer Rest]
  ? Iterable<[...Rest, Value]>
  : never;
const x: MultiKeyMap<[id1: string, id2: string], object> = null!;
const id1 = "abc" as string;
const matches = x.get(id1);
