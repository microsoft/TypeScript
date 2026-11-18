// @strict: true
// @target: esnext
// @noEmit: true

declare function queryOptions<U>(): Omit<{
    queryKey: string;
    queryFn: () => { slug: string };
}, keyof U>;

// Keep the call before the interface declarations.
const resume = ensureQueryData(queryOptions());
resume.slug;

interface QueryOptions<T, K> {
    queryKey?: K;
    queryFn?: () => T;
}
type WithRequired<T> = T & { queryKey: {} };
interface FetchQueryOptions<T, K>
    extends WithRequired<QueryOptions<T, K>> {
    initialPageParam?: never;
}
interface EnsureQueryDataOptions<T, K>
    extends FetchQueryOptions<T, K> {}

declare function ensureQueryData<T, K>(
    options: EnsureQueryDataOptions<T, K>
): T;

export {};
