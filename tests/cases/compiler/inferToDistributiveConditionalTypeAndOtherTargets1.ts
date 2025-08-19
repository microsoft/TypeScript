// @strict: true
// @noEmit: true

type NonUndefinedGuard<T> = T extends undefined ? never : T;

declare const RefSymbol: unique symbol;

interface Ref<T = any, S = T> {
  get value(): T;
  set value(_: S);
  [RefSymbol]: true;
}

type MaybeRef<T> = Ref<T> | T;

type MaybeRefDeep<T> = MaybeRef<
  T extends Function
    ? T
    : T extends object
    ? {
        [Property in keyof T]: MaybeRefDeep<T[Property]>;
      }
    : T
>;

type QueryFunction<T = unknown> = () => T | Promise<T>;

type InitialDataFunction<T> = () => T | undefined;

interface QueryOptions<TQueryFnData = unknown, TData = TQueryFnData> {
  queryFn?: QueryFunction<TQueryFnData>;
  initialData?: TData | InitialDataFunction<TData>;
}

type UseQueryOptions<TQueryFnData = unknown, TQueryData = TQueryFnData> = {
  [Property in keyof QueryOptions<TQueryFnData, TQueryData>]: MaybeRefDeep<
    QueryOptions<TQueryFnData, TQueryData>[Property]
  >;
};

type DefinedInitialQueryOptions<TQueryFnData = unknown> = UseQueryOptions<
  TQueryFnData,
  TQueryFnData
> & {
  initialData:
    | NonUndefinedGuard<TQueryFnData>
    | (() => NonUndefinedGuard<TQueryFnData>);
};

declare function queryOptions<TQueryFnData = unknown>(
  options: DefinedInitialQueryOptions<TQueryFnData>,
): DefinedInitialQueryOptions<TQueryFnData>;

const result = queryOptions({
  initialData: () => ({
    wow: true,
  }),
});
