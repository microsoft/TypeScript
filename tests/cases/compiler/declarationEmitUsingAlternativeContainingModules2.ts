// @strict: true
// @declaration: true
// @module: nodenext
// @moduleResolution: nodenext
// @target: esnext

// @filename: node_modules/@tanstack/vue-query/build/modern/useQuery-CPqkvEsh.d.ts
type QueryKey = ReadonlyArray<unknown>;

interface Register {}

type DefaultError = Register extends {
  defaultError: infer TError;
}
  ? TError
  : Error;

type ShouldRetryFunction<TError = DefaultError> = (
  failureCount: number,
  error: TError,
) => boolean;
type RetryValue<TError> = boolean | number | ShouldRetryFunction<TError>;

type QueryFunctionContext<
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> = [TPageParam] extends [never]
  ? {
      queryKey: TQueryKey;
    }
  : {
      queryKey: TQueryKey;
      pageParam: TPageParam;
    };

type QueryFunction<
  T = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> = (context: QueryFunctionContext<TQueryKey, TPageParam>) => T | Promise<T>;

interface QueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> {
  retry?: RetryValue<TError>;
  queryFn?: QueryFunction<TQueryFnData, TQueryKey, TPageParam>;
  queryKey?: TQueryKey;
  initialData?: TData;
  initialDataUpdatedAt?: number | (() => number | undefined);
}

interface QueryObserverOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> extends QueryOptions<
    TQueryFnData,
    TError,
    TQueryData,
    TQueryKey,
    TPageParam
  > {
  enabled?: boolean;
  refetchInterval?: number;
  select?: (data: TQueryData) => TData;
}

type UseQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = {
  [Property in keyof QueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >]: QueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >[Property];
};

type UndefinedInitialQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey> & {
  initialData?: undefined;
};

interface QueryObserverBaseResult<TData = unknown, TError = DefaultError> {
  data: TData | undefined;
  dataUpdatedAt: number;
  error: TError | null;
  errorUpdatedAt: number;
  failureCount: number;
  failureReason: TError | null;
  errorUpdateCount: number;
  isError: boolean;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isPending: boolean;
  isLoadingError: boolean;
  isInitialLoading: boolean;
  isPaused: boolean;
  isPlaceholderData: boolean;
  isRefetchError: boolean;
  isRefetching: boolean;
  isStale: boolean;
  isSuccess: boolean;
}

interface QueryObserverSuccessResult<TData = unknown, TError = DefaultError>
  extends QueryObserverBaseResult<TData, TError> {
  data: TData;
  error: null;
  isError: false;
  isPending: false;
  isLoadingError: false;
  isRefetchError: false;
  isSuccess: true;
  status: "success";
}

type DefinedQueryObserverResult<
  TData = unknown,
  TError = DefaultError,
> = QueryObserverSuccessResult<TData, TError>;
type QueryObserverResult<
  TData = unknown,
  TError = DefaultError,
> = DefinedQueryObserverResult<TData, TError>;

type ToRef<T> = {
  value: T;
};

type UseBaseQueryReturnType<
  TData,
  TError,
  Result = QueryObserverResult<TData, TError>,
> = {
  [K in keyof Result]: K extends
    | "fetchNextPage"
    | "fetchPreviousPage"
    | "refetch"
    ? Result[K]
    : ToRef<Readonly<Result>[K]>;
} & {
  suspense: () => Promise<Result>;
};

type UseQueryReturnType<TData, TError> = UseBaseQueryReturnType<TData, TError>;

declare function useQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryReturnType<TData, TError>;

export { type UseQueryReturnType as b, useQuery as u };

// @filename: node_modules/@tanstack/vue-query/build/modern/index.d.ts
export { b as UseQueryReturnType, u as useQuery } from './useQuery-CPqkvEsh.js';

// @filename: node_modules/@tanstack/vue-query/package.json
{
  "name": "@tanstack/vue-query",
  "type": "module",
  "exports": {
    ".": {
      "import": {
        "types": "./build/modern/index.d.ts",
        "default": "./build/modern/index.js"
      },
      "require": {
        "types": "./build/modern/index.d.cts",
        "default": "./build/modern/index.cjs"
      }
    }
  }
}

// @filename: src/index.mts
import { useQuery } from '@tanstack/vue-query'

const baseUrl = 'https://api.publicapis.org/'

interface IEntry {
  API: string
  Description: string
  Auth: string
  HTTPS: boolean
  Cors: string
  Link: string
  Category: string
}

const testApi = {
  getEntries: (): Promise<IEntry[]> => {
    return fetch(baseUrl + 'entries')
      .then((res) => res.json())
      .then((data) => data.entries)
      .catch((err) => console.log(err))
  }
}

const entryKeys = {
  all: ['entries'] as const,
  list: () => [...entryKeys.all, 'list'] as const
}

export const useEntries = () => {
  return useQuery({
    queryKey: entryKeys.list(),
    queryFn: testApi.getEntries,
    select: (data) => data.slice(0, 10)
  })
}
