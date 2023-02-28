// @strict: true
// @lib: esnext
// @noEmit: true

declare function test<T extends Record<string, { foo: unknown; bar: unknown }>>(a: {
  [K in keyof T]: {
    foo: T[K]["foo"];
    onFoo: (fooArg: T[K]["foo"]) => void;
    bar: T[K]["bar"];
    onBar: (barArg: T[K]["bar"]) => void;
  };
}): T;

const res = test({
    a: {
        foo: 'answer',
        onFoo: (arg) => arg.length,
        bar: 42,
        onBar: (arg) => arg + 10
    },
    b: {
        foo: true,
        onFoo: (arg) => !!arg,
        bar: [1, 2, 3],
        onBar: (arg) => [arg, arg]
    },
})

interface QueryFunctionContext<TQueryKey extends string> {
  queryKey: TQueryKey;
}

type QueryOptions = {
  key: string;
  fnData?: unknown;
};

type UseQueriesOptions<T extends ReadonlyArray<QueryOptions>> = {
  [K in keyof T]: {
    queryKey: T[K]["key"];
    queryFn?: (
      ctx: QueryFunctionContext<T[K]["key"]>
    ) => Promise<T[K]["fnData"]> | T[K]["fnData"];
  };
};

declare function useQueries<T extends ReadonlyArray<QueryOptions>>(
  queries: [...UseQueriesOptions<T>]
): T;

const resQueries = useQueries([
  {
    queryKey: "users",
    queryFn: (key) => [{ name: "Andarist" }],
  },
  {
    queryKey: "posts",
    queryFn: (key) => Promise.resolve([{ title: 'TS 5.1' }]),
  }
]);
