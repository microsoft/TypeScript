// @strict: true
// @target: esnext
// @noEmit: true

// @filename: returnTypeCycle.ts
// Callbacks contextually checked while a cycle is in progress are checked
// again once it is discarded, with their contextual parameter types.

declare function useCallback<T extends Function>(callback: T): T;
declare function refreshAll<T>(options: { ids: string[]; extra: T }): Promise<T>;

interface View {
    refresh: (force?: boolean) => Promise<number>;
}

declare const items: { id: string }[];

function useView(): View {
    const refresh = useCallback((force?: boolean) =>
        refreshAll({
            ids: items.map(({ id }) => id),
            extra: 1,
        }));
    return { refresh };
}

// @filename: yieldOperandCycle.ts
interface Eff<A, E> {
    [Symbol.iterator](): Generator<Eff<A, E>, A, any>;
    pipe<B>(f: (self: Eff<A, E>) => B): B;
}
declare function mapError<E, E2>(f: (e: E) => E2): <A>(self: Eff<A, E>) => Eff<A, E2>;
declare function fn<Y, R>(body: (input: number) => Generator<Y, R, any>): (input: number) => Eff<R, never>;
declare function make<T extends string>(s: T): T;
declare const uuid: Eff<string, Error>;

fn(function* (input) {
    make(yield* uuid.pipe(mapError((cause) => ({ cause }))));
});
