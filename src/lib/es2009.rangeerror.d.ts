/// <reference lib="es2009.error" />

interface RangeError extends Error {
}

interface RangeErrorConstructor extends ErrorConstructor {
    new(message?: string): RangeError;
    (message?: string): RangeError;
    readonly prototype: RangeError;
}

declare var RangeError: RangeErrorConstructor;
