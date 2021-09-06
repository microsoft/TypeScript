interface Error {
    cause?: Error;
}

interface ErrorOptions {
    cause?: Error;
}

interface ErrorConstructor {
    new(message?: string, options?: ErrorOptions): Error;
    (message?: string, options?: ErrorOptions): Error;
}

interface EvalError extends Error {
}

interface EvalErrorConstructor extends ErrorConstructor {
    new(message?: string, options?: ErrorOptions): EvalError;
    (message?: string, options?: ErrorOptions): EvalError;
}

interface RangeError extends Error {
}

interface RangeErrorConstructor extends ErrorConstructor {
    new(message?: string, options?: ErrorOptions): RangeError;
    (message?: string, options?: ErrorOptions): RangeError;
}

interface ReferenceError extends Error {
}

interface ReferenceErrorConstructor extends ErrorConstructor {
    new(message?: string, options?: ErrorOptions): ReferenceError;
    (message?: string, options?: ErrorOptions): ReferenceError;
}

interface SyntaxError extends Error {
}

interface SyntaxErrorConstructor extends ErrorConstructor {
    new(message?: string, options?: ErrorOptions): SyntaxError;
    (message?: string, options?: ErrorOptions): SyntaxError;
}

interface TypeError extends Error {
}

interface TypeErrorConstructor extends ErrorConstructor {
    new(message?: string, options?: ErrorOptions): TypeError;
    (message?: string, options?: ErrorOptions): TypeError;
}

interface URIError extends Error {
}

interface URIErrorConstructor extends ErrorConstructor {
    new(message?: string, options?: ErrorOptions): URIError;
    (message?: string, options?: ErrorOptions): URIError;
}

interface AggregateError extends Error {
}

interface AggregateErrorConstructor extends ErrorConstructor {
    new(errors: Iterable<any>, message?: string, options?: ErrorOptions): AggregateError;
    (errors: Iterable<any>, message?: string, options?: ErrorOptions): AggregateError;
}
