//// [tests/cases/compiler/typeofObjectInference.ts] ////

//// [typeofObjectInference.ts]
let val = 1

function decorateA<O extends any>(fn: (first: {value: typeof val}) => O) {
    return (): O => fn({value: val})
}
let a = decorateA(({value}) => 5)

function decorateB<O extends any>(fn: (first: typeof val) => O) {
    return (): O => fn(val)
}
let b = decorateB((value) => 5)

function decorateC<O extends any>(fn: (first: {value: number}) => O) {
    return (): O => fn({value: val})
}
let c = decorateC(({value}) => 5)

type First = {value: typeof val}
function decorateD<O extends any>(fn: (first: First) => O) {
    return (): O => fn({value: val})
}
let d = decorateD(({value}) => 5)

//// [typeofObjectInference.js]
var val = 1;
function decorateA(fn) {
    return function () { return fn({ value: val }); };
}
var a = decorateA(function (_a) {
    var value = _a.value;
    return 5;
});
function decorateB(fn) {
    return function () { return fn(val); };
}
var b = decorateB(function (value) { return 5; });
function decorateC(fn) {
    return function () { return fn({ value: val }); };
}
var c = decorateC(function (_a) {
    var value = _a.value;
    return 5;
});
function decorateD(fn) {
    return function () { return fn({ value: val }); };
}
var d = decorateD(function (_a) {
    var value = _a.value;
    return 5;
});
