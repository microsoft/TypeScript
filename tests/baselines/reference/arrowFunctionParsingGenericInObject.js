//// [arrowFunctionParsingGenericInObject.ts]
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


//// [arrowFunctionParsingGenericInObject.js]
// Apparent parser error when first property of returned object is generic function with default type
var fails1 = function () { return ({
    test: function (value) { return value; },
    extraValue: function () { }
}); };
// Without a default type, it works fine
var works1 = function () { return ({
    test: function (value) { return value; },
    extraValue: function () { }
}); };
// As second property, it works fine
var works2 = function () { return ({
    extraValue: function () { },
    test: function (value) { return value; }
}); };
// The first property _must_ be a function, though
var fails2 = function () { return ({
    extraValue: '',
    test: function (value) { return value; }
}); };
