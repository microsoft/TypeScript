//// [tests/cases/compiler/errorHandlingInInstanceOf.ts] ////

//// [errorHandlingInInstanceOf.ts]
if (x instanceof String) {
}

var y: any;
if (y instanceof UnknownType) {
}

//// [errorHandlingInInstanceOf.js]
if (x instanceof String) {
}
var y;
if (y instanceof UnknownType) {
}
