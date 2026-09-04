// @target: esnext
// @lib: es2025,es2026.error
// @noEmit: true
// @strict: true

declare const value: unknown;

if (Error.isError(value)) {
    const message: string = value.message;
}
