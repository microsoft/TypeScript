//// [arrowFunctionParsingGenericInObject.ts]
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


//// [arrowFunctionParsingGenericInObject.js]
var fails1 = function () { return ({
    test: function (value) { return value; },
    extraValue: function () { }
}); };
var works1 = function () { return ({
    test: function (value) { return value; },
    extraValue: function () { }
}); };
var works2 = function () { return ({
    extraValue: function () { },
    test: function (value) { return value; }
}); };
var fails2 = function () { return ({
    extraValue: '',
    test: function (value) { return value; }
}); };
