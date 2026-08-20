//// [tests/cases/compiler/jsExportAssignmentNonMutableLocation.ts] ////

//// [file.js]
const customSymbol = Symbol("custom");

// This is a common pattern in Node’s built-in modules:
module.exports = {
    customSymbol,
};

exports.customSymbol2 = Symbol("custom");



//// [file.d.ts]
declare const _exports: {
    customSymbol: symbol;
};
export = _exports;
declare namespace _exports {
    export var customSymbol2: symbol;
}
