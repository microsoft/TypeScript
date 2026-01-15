// @target: es2015
// @noTypesAndSymbols: true
// https://github.com/microsoft/TypeScript/issues/47079

function f({a, ...x}, b = a) {
    return b;
}

function g({a, ...x}, b = ({a}, b = a) => {}) {
    return b;
}
