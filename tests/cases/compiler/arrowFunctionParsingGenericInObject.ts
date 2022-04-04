const fails1 = () => ({
    test: <T = undefined>(value: T): T => value,
    extraValue: () => {},
})

const works1 = () => ({
    test: <T>(value: T): T => value,
    extraValue: () => {},
})

const works2 = () => ({
    extraValue: () => {},
    test: <T = undefined>(value: T): T => value,
})

const fails2 = () => ({
    extraValue: '',
    test: <T = undefined>(value: T): T => value,
})
