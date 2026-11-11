// @strict: true
// @lib: es2015,dom
// @noEmit: true

declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
type CallableCopy<T extends (...args: never[]) => unknown> = (...args: Parameters<T>) => ReturnType<T>;
declare const copiedFetch: CallableCopy<typeof fetch>;
const replacementFetch: typeof fetch = copiedFetch;
