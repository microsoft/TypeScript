//// [tests/cases/compiler/typeArgumentInferenceApparentType1.ts] ////

//// [typeArgumentInferenceApparentType1.ts]
function method<T>(iterable: Iterable<T>): T {
    return;
}

var res: string = method("test");

//// [typeArgumentInferenceApparentType1.js]
function method(iterable) {
    return;
}
var res = method("test");
