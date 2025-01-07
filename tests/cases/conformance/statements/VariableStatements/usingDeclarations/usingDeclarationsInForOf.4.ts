// @strict: true
// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

for (using x of [1, 2]) {}

for (using x of [{}]) {}

for (using x of [null, undefined]) {}

for (using x of [{ [Symbol.dispose]() {} }]) {}

for (using x of [{ [Symbol.dispose]() {}, value: null }]) {}

declare const gen1: Generator<number, void, void>;
for (using x of gen1) {}

declare const gen2: Generator<Disposable, void, void>;
for (using x of gen2) {}

declare const gen3: Generator<Disposable | number, void, void>;
for (using x of gen3) {}

for (await using x of [1, 2]) {}

for (await using x of [{}]) {}

for (await using x of [null, undefined]) {}

for (await using x of [{ async [Symbol.asyncDispose]() {} }]) {}

for (await using x of [{ async [Symbol.asyncDispose]() {}, value: null }]) {}

declare const gen4: Generator<number, void, void>;
for (await using x of gen4) {}

declare const gen5: Generator<AsyncDisposable, void, void>;
for (await using x of gen5) {}

declare const gen6: Generator<AsyncDisposable | number, void, void>;
for (await using x of gen6) {}

for (await using x of gen2) {}
for (await using x of gen3) {}

export {};
