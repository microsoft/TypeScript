// @target: esnext
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
