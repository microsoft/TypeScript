// @strict: true
// @noEmit: true
// @lib: esnext

// repro #51187

type Action = () => (Generator<string, string, string[]> | string)

const test1: Action = function* () {
    const next = yield ''
    return next[0]
}

type Action2 = () => (AsyncGenerator<string, string, string[]> | string)

const test2: Action2 = async function* () {
    const next = yield await Promise.resolve('')
    return next[0]
}
