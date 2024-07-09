// @target: es5, es2015, esnext
// @noEmit: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/36295

function a(): any {}

function b({ b = a(), ...x } = a()) {
    var a;
}

const x = "";

function c({ b, ...c } = a(), d = x) {
    var x;
}