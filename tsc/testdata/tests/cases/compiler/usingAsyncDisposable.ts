// @strict: true
// @target: esnext
// @module: esnext
// @lib: esnext
// @noEmit: true

declare const asyncDisposable: AsyncDisposable;
declare const optionalAsyncDisposable: AsyncDisposable | null | undefined;
declare const disposable: Disposable;
declare const both: AsyncDisposable & Disposable;

using asyncResource = asyncDisposable;
using optionalAsyncResource = optionalAsyncDisposable;
using syncResource = disposable;
using eitherResource = both;

await using awaitedAsyncResource = asyncDisposable;

export {};
