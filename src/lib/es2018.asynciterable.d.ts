/// <reference lib="es2015.symbol" />
/// <reference lib="es2015.iterable" />

interface SymbolConstructor {
    /**
     * A method that returns the default async iterator for an object. Called by the semantics of
     * the for-await-of statement.
     */
    readonly asyncIterator: symbol;
}

interface AsyncIterator<T, TReturn = any, TNext = undefined> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn extends PromiseLike<infer UReturn> ? UReturn : TReturn>>;
    return?(value?: TReturn): Promise<IteratorResult<T, TReturn extends PromiseLike<infer UReturn> ? UReturn : TReturn>>;
    throw?(e?: any): Promise<IteratorResult<T, TReturn extends PromiseLike<infer UReturn> ? UReturn : TReturn>>;
}

interface AsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
}

interface AsyncIterableIterator<T> extends AsyncIterator<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}
