/// <reference lib="es2018.asynciterable" />

interface AsyncGenerator<T = unknown, TReturn = T | void, TNext = unknown> extends AsyncIterableIterator<T, TReturn, TNext> {
    next(value?: TNext): Promise<IteratorResult<T, TReturn>>;
    return(value: TReturn): Promise<IteratorResult<T, TReturn>>;
    throw(e: unknown): Promise<IteratorResult<T, TReturn>>;
    [Symbol.asyncIterator](): AsyncGenerator<T, TReturn, TNext>;
}

interface AsyncGeneratorFunction {
    /**
     * Creates a new AsyncGenerator object.
     * @param args A list of arguments the function accepts.
     */
    new (...args: any[]): AsyncGenerator;
    /**
     * Creates a new AsyncGenerator object.
     * @param args A list of arguments the function accepts.
     */
    (...args: any[]): AsyncGenerator;
    /**
     * The length of the arguments.
     */
    readonly length: number;
    /**
     * Returns the name of the function.
     */
    readonly name: string;
    /**
     * A reference to the prototype.
     */
    readonly prototype: AsyncGenerator;
}

interface AsyncGeneratorFunctionConstructor {
    /**
     * Creates a new AsyncGenerator function.
     * @param args A list of arguments the function accepts.
     */
    new (...args: string[]): AsyncGeneratorFunction;
    /**
     * Creates a new AsyncGenerator function.
     * @param args A list of arguments the function accepts.
     */
    (...args: string[]): AsyncGeneratorFunction;
    /**
     * The length of the arguments.
     */
    readonly length: number;
    /**
     * Returns the name of the function.
     */
    readonly name: string;
    /**
     * A reference to the prototype.
     */
    readonly prototype: AsyncGeneratorFunction;
}
