// @target: es2022
// @lib: esnext,dom
// @module: commonjs,system,esnext,amd
// @noTypesAndSymbols: true
// @noEmitHelpers: true

export { y };

using z = { [Symbol.dispose]() {} };

if (false) {
    var y = 1;
}

function f() {
    console.log(y, z);
}

