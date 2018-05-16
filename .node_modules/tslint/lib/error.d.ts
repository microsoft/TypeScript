/**
 * Generic error typing for EcmaScript errors
 * Define `Error` here to avoid using `Error` from @types/node.
 * Using the `node` version causes a compilation error when this code is used as an npm library if @types/node is not already imported.
 */
export declare class Error {
    name?: string;
    message: string;
    stack?: string;
    constructor(message?: string);
}
/**
 * Used to exit the program and display a friendly message without the callstack.
 */
export declare class FatalError extends Error {
    message: string;
    innerError: Error | undefined;
    static NAME: string;
    constructor(message: string, innerError?: Error | undefined);
}
export declare function isError(possibleError: any): possibleError is Error;
export declare function showWarningOnce(message: string): void;
export declare function showRuleCrashWarning(message: string, ruleName: string, fileName: string): void;
