/// <reference lib="esnext.disposable" />

import { Debug } from "./debug";

export { };

// Shim `Symbol.dispose` so that we can can use `using`.
if (!Symbol.dispose) {
    try {
        Object.defineProperty(Symbol, "dispose", { configurable: true, writable: true, value: Symbol.for("Symbol.dispose") });
    }
    catch {
        // do nothing
    }
}

/** @internal */
export function createSuppressedError(error: unknown, suppressed: unknown) {
    if (typeof SuppressedError === "function") {
        return Debug.captureStackTrace(new SuppressedError(error, suppressed), createSuppressedError);
    }

    const e = new Error("An error suppression occurred.") as SuppressedError;
    e.error = error;
    e.suppressed = suppressed;
    e.name = "SuppressedError";
    return Debug.captureStackTrace(e, createSuppressedError);
}

/** @internal */
export function createDisposableStack() {
    return new disposableStackConstructor();
}

const disposableStackConstructor = typeof DisposableStack === "function" ? DisposableStack : createDisposableStackShim();

function createDisposableStackShim(): new () => DisposableStack {
    class DisposableStack implements globalThis.DisposableStack {
        private _stack: { resource: unknown, dispose: (this: unknown) => void }[] = [];
        private _disposed = false;

        get disposed(): boolean {
            return this._disposed;
        }

        dispose(): void {
            if (this._disposed) {
                return;
            }

            this._disposed = true;

            let error: unknown;
            let hasError = false;
            let entry;
            while (entry = this._stack.pop()) {
                try {
                    const { resource, dispose } = entry;
                    dispose.call(resource);
                }
                catch (e) {
                    error = hasError ? createSuppressedError(e, error) : e;
                    hasError = true;
                }
            }

            if (hasError) {
                throw error;
            }
        }

        use<T extends Disposable | null | undefined>(value: T): T {
            if (this._disposed) throw new ReferenceError("Object is disposed");
            if (value === undefined) return value;
            Debug.assert(typeof value === "object");
            if (!value) return value;
            const dispose = value[Symbol.dispose];
            Debug.assert(typeof dispose === "function");
            this._stack.push({ resource: value, dispose });
            return value;
        }

        adopt<T>(value: T, onDispose: (value: T) => void): T {
            if (this._disposed) throw new ReferenceError("Object is disposed");
            Debug.assert(typeof onDispose === "function");
            this._stack.push({ resource: undefined, dispose: () => { onDispose(value); } });
            return value;
        }

        defer(onDispose: () => void): void {
            if (this._disposed) throw new ReferenceError("Object is disposed");
            Debug.assert(typeof onDispose === "function");
            this._stack.push({ resource: undefined, dispose: onDispose });
        }

        move(): globalThis.DisposableStack {
            if (this._disposed) throw new ReferenceError("Object is disposed");
            const stack = new DisposableStack();
            stack._stack = this._stack;
            this._stack = [];
            this._disposed = true;
            return stack;
        }

        [Symbol.dispose](): void {
            this.dispose();
        }

        [Symbol.toStringTag]!: string;

        static {
            this.prototype[Symbol.dispose] = this.prototype.dispose;
            Object.defineProperty(this.prototype, Symbol.toStringTag, { configurable: true, writable: true, value: "DisposableStack" });
        }
    }
    return DisposableStack;
}
