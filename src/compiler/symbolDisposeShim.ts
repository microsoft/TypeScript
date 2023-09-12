/// <reference lib="esnext.disposable" />
export {};

// Shim `Symbol.dispose` so that we can can use `using`.
if (!Symbol.dispose) {
    try {
        Object.defineProperty(Symbol, "dispose", { configurable: true, writable: true, value: Symbol.for("Symbol.dispose") });
    }
    catch {
        // do nothing
    }
}
