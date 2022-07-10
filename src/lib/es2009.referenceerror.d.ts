/// <reference lib="es2009.error" />

interface ReferenceError extends Error {
}

interface ReferenceErrorConstructor extends ErrorConstructor {
    new(message?: string): ReferenceError;
    (message?: string): ReferenceError;
    readonly prototype: ReferenceError;
}

declare var ReferenceError: ReferenceErrorConstructor;
