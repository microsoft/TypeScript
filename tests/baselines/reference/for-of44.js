//// [tests/cases/conformance/es6/for-ofStatements/for-of44.ts] ////

//// [for-of44.ts]
var array: [number, string | boolean | symbol][] = [[0, ""], [0, true], [1, Symbol()]]
for (var [num, strBoolSym] of array) {
    num;
    strBoolSym;
}

//// [for-of44.js]
var array = [[0, ""], [0, true], [1, Symbol()]];
for (var [num, strBoolSym] of array) {
    num;
    strBoolSym;
}
