// @strict: true
interface Box<T> {
    v: T;
}

interface ErrorResult {
    readonly error: true
}

interface AsyncLoaderProps<TResult extends {}> {
    readonly asyncLoad: () => Box<TResult>;
    readonly children: (result: Exclude<TResult, ErrorResult>) => string;
}

class AsyncLoader<TResult extends {}> {
    constructor(props: string, context: any);
    constructor(props: AsyncLoaderProps<TResult>);
    constructor(...args: any[]) {}
}

function load(): Box<{ success: true } | ErrorResult> {
    return null as any;
}

new AsyncLoader({
    asyncLoad: load,
    children: result => result.success as any,
}); // should work fine
