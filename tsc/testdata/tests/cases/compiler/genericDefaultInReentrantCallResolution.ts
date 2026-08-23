// @target: es2015
// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63949

declare function fetcher<D>(cfg: unknown): Promise<D>;

type Routes<R> = R extends "x" ? { IN: { v: number }; OUT: string } : never;

function executeFetch<R extends string, T = Routes<R>>(
    route: R,
    body?: T extends Record<"IN", any> ? T["IN"] : never,
) {
    return fetcher<T extends Record<"OUT", any> ? T["OUT"] : T>({ route, body });
}

declare function useCallback<T extends Function>(cb: T, deps: unknown[]): T;

export const cb = useCallback((data: { v: number }) => {
    return executeFetch("x", data);
}, []);

export const check: Promise<string> = cb({ v: 1 });
