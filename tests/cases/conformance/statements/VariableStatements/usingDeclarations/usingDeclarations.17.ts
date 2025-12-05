// @target: esnext
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

switch (Math.random()) {
    case 0:
        using d20 = { [Symbol.dispose]() {} };
        break;

    case 1:
        using d21 = { [Symbol.dispose]() {} };
        break;

    default:
        using d22 = { [Symbol.dispose]() {} };
}

if (true)
    switch (0) {
        case 0:
            using d23 = { [Symbol.dispose]() {} };
            break;

        default:
            using d24 = { [Symbol.dispose]() {} };
    }

export {};
