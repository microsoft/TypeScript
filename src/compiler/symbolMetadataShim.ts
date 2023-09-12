/// <reference lib="esnext.decorators" />
export {};

// Inject `Symbol.metadata`, if it is missing, so that we can leverage it from the `@Shared()` decorator.
if (!Symbol.metadata) {
    try {
        Object.defineProperty(Symbol, "metadata", { configurable: true, writable: true, value: Symbol.for("Symbol.metadata") });
    }
    catch {
        // do nothing
    }
}
