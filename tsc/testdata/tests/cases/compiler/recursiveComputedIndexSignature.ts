// @strict: true
// @noEmit: true

interface Value<T> { output: T; }
interface Dictionary<T> { [key: string]: T; }
interface ComputedDictionary<T extends Value<unknown>> extends Dictionary<T["output"]> {}
interface DictionarySchema<T extends Value<unknown>> extends Value<ComputedDictionary<T>> {}
interface Root extends DictionarySchema<Root> {}

declare const root: Root["output"];
const childToRoot: typeof root = root.first.second.third;
const rootToChild: typeof root.first = root;
const wrong: number = root.first.second.third;

interface ReadonlyDictionary<T> { readonly [key: string]: T; }
interface ComputedReadonly<T extends Value<unknown>> extends ReadonlyDictionary<T["output"]> {}
interface ReadonlySchema<T extends Value<unknown>> extends Value<ComputedReadonly<T>> {}
interface ReadonlyRoot extends ReadonlySchema<ReadonlyRoot> {}

declare const readonlyRoot: ReadonlyRoot["output"];
const readonlyChildToRoot: typeof readonlyRoot = readonlyRoot.first.second;
const readonlyRootToChild: typeof readonlyRoot.first = readonlyRoot;
readonlyRoot.first = readonlyRoot;
const wrongReadonly: number = readonlyRoot.first.second;
