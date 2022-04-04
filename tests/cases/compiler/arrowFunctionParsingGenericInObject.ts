// Apparent parser error when first property of returned object is generic function with default type
const fails1 = () => ({
    test: <T = undefined>(value: T): T => value,
    extraValue: () => {},
})

// Without a default type, it works fine
const works1 = () => ({
    test: <T>(value: T): T => value,
    extraValue: () => {},
})

// As second property, it works fine
const works2 = () => ({
    extraValue: () => {},
    test: <T = undefined>(value: T): T => value,
})

// The first property _must_ be a function, though
const fails2 = () => ({
    extraValue: '',
    test: <T = undefined>(value: T): T => value,
})
