/// <reference lib="es2009.error" />

interface TypeError extends Error {
}

interface TypeErrorConstructor extends ErrorConstructor {
    new(message?: string): TypeError;
    (message?: string): TypeError;
    readonly prototype: TypeError;
}

declare var TypeError: TypeErrorConstructor;
