/// <reference lib="es2015.symbol" />
/// <reference lib="es2015.iterable" />

interface SymbolConstructor {
    /**
     * A method that returns the default async iterator for an object. Called by the semantics of
     * the for-await-of statement.
     */
    readonly asyncIterator: symbol;
}

interface AsyncIterator<T, TReturn = T | void, TNext = unknown> {
    next(value?: TNext): Promise<IteratorResult<T, TReturn>>;
    return?(value?: TReturn): Promise<IteratorResult<T, TReturn>>;
    throw?(e?: unknown): Promise<IteratorResult<T, TReturn>>;
}

interface AsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
}

interface AsyncIterableIterator<T, TReturn = T | void, TNext = unknown> extends AsyncIterator<T, TReturn, TNext> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T, TReturn, TNext>;
}