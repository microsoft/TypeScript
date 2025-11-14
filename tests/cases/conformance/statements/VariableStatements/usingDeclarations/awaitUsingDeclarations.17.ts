// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

switch (Math.random()) {
    case 0:
        await using d20 = { async [Symbol.asyncDispose]() {} };
        break;

    case 1:
        await using d21 = { async [Symbol.asyncDispose]() {} };
        break;

    default:
        await using d22 = { async [Symbol.asyncDispose]() {} };
}

if (true)
    switch (0) {
        case 0:
            await using d23 = { async [Symbol.asyncDispose]() {} };
            break;

        default:
            await using d24 = { async [Symbol.asyncDispose]() {} };
    }

export {};
