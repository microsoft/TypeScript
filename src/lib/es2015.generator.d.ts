interface Generator extends Iterator<any> { }

interface GeneratorFunction {
    /**
     * Creates a new Generator object.
     * @param args A list of arguments the function accepts.
     */
    new (...args: any[]): Generator;
    (...args: any[]): Generator;
}

interface GeneratorFunctionConstructor {
    /**
      * Creates a new Generator function.
      * @param args A list of arguments the function accepts.
      */
    new (...args: string[]): GeneratorFunction;
    (...args: string[]): GeneratorFunction;
    readonly prototype: GeneratorFunction;
}
declare var GeneratorFunction: GeneratorFunctionConstructor;
