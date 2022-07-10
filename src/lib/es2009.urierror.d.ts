/// <reference lib="es2009.error" />

interface URIError extends Error {
}

interface URIErrorConstructor extends ErrorConstructor {
    new(message?: string): URIError;
    (message?: string): URIError;
    readonly prototype: URIError;
}

declare var URIError: URIErrorConstructor;
