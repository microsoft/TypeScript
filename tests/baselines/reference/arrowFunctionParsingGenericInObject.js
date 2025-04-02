//// [tests/cases/compiler/arrowFunctionParsingGenericInObject.ts] ////

//// [arrowFunctionParsingGenericInObject.ts]
const fn1 = () => ({
    test: <T = undefined>(value: T): T => value,
    extraValue: () => {},
})

const fn1async = () => ({
    test: async <T = undefined>(value: T): Promise<T> => value,
    extraValue: () => {},
})

const fn2 = () => ({
    test: <T>(value: T): T => value,
    extraValue: () => {},
})

const fn2async = () => ({
    test: async <T>(value: T): Promise<T> => value,
    extraValue: () => {},
})

const fn3 = () => ({
    extraValue: () => {},
    test: <T = undefined>(value: T): T => value,
})

const fn3async = () => ({
    extraValue: () => {},
    test: async <T = undefined>(value: T): Promise<T> => value,
})

const fn4 = () => ({
    extraValue: '',
    test: <T = undefined>(value: T): T => value,
})

const fn4async = () => ({
    extraValue: '',
    test: async <T = undefined>(value: T): Promise<T> => value,
})


//// [arrowFunctionParsingGenericInObject.js]
const fn1 = () => ({
    test: (value) => value,
    extraValue: () => { },
});
const fn1async = () => ({
    test: async (value) => value,
    extraValue: () => { },
});
const fn2 = () => ({
    test: (value) => value,
    extraValue: () => { },
});
const fn2async = () => ({
    test: async (value) => value,
    extraValue: () => { },
});
const fn3 = () => ({
    extraValue: () => { },
    test: (value) => value,
});
const fn3async = () => ({
    extraValue: () => { },
    test: async (value) => value,
});
const fn4 = () => ({
    extraValue: '',
    test: (value) => value,
});
const fn4async = () => ({
    extraValue: '',
    test: async (value) => value,
});
