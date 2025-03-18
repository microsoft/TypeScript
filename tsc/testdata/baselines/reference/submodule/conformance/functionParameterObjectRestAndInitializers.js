//// [tests/cases/conformance/functions/functionParameterObjectRestAndInitializers.ts] ////

//// [functionParameterObjectRestAndInitializers.ts]
// https://github.com/microsoft/TypeScript/issues/47079

function f({a, ...x}, b = a) {
    return b;
}

function g({a, ...x}, b = ({a}, b = a) => {}) {
    return b;
}


//// [functionParameterObjectRestAndInitializers.js]
function f({ a, ...x }, b = a) {
    return b;
}
function g({ a, ...x }, b = ({ a }, b = a) => { }) {
    return b;
}
