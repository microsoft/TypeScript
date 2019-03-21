/// <reference lib="es2018.asynciterable" />

interface AsyncGenerator<TYield = unknown, TReturn = void, TNext = unknown> {
    next(value?: TNext): Promise<IteratorResult<TYield, TReturn>>;
    return(value: TReturn): Promise<IteratorResult<TYield, TReturn>>;
    throw(e: unknown): Promise<IteratorResult<TYield, TReturn>>;
    [Symbol.asyncIterator](): AsyncGenerator<TYield, TReturn, TNext>;
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
