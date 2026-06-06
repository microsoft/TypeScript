// @strict: false
// @target: es2024
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

export class Symbol {
}

export const output: string[] = [];

{
    using _ = {
        [globalThis.Symbol.dispose]() {
            output.push("disposed");
        },
    };
}

async function disposeAsync() {
    await using _ = {
        async [globalThis.Symbol.asyncDispose]() {
            output.push("async disposed");
        },
    };
}

disposeAsync();
