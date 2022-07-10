/// <reference lib="es2009.error" />

interface SyntaxError extends Error {
}

interface SyntaxErrorConstructor extends ErrorConstructor {
    new(message?: string): SyntaxError;
    (message?: string): SyntaxError;
    readonly prototype: SyntaxError;
}

declare var SyntaxError: SyntaxErrorConstructor;
