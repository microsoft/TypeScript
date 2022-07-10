/// <reference lib="es2009.error" />

interface EvalError extends Error {
}

interface EvalErrorConstructor extends ErrorConstructor {
    new(message?: string): EvalError;
    (message?: string): EvalError;
    readonly prototype: EvalError;
}

declare var EvalError: EvalErrorConstructor;
