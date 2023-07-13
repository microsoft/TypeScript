//// [tests/cases/conformance/types/tuple/typeInferenceWithTupleType.ts] ////

//// [typeInferenceWithTupleType.ts]
function combine<T, U>(x: T, y: U): [T, U] {
    return [x, y];
}

var combineResult = combine("string", 10);
var combineEle1 = combineResult[0]; // string
var combineEle2 = combineResult[1]; // number

function zip<T, U>(array1: T[], array2: U[]): [[T, U]] {
    if (array1.length != array2.length) {
        return [[undefined, undefined]];
    }
    var length = array1.length;
    var zipResult: [[T, U]];
    for (var i = 0; i < length; ++i) {
        zipResult.push([array1[i], array2[i]]);
    }
    return zipResult;
}

var zipResult = zip(["foo", "bar"], [5, 6]);
var zipResultEle = zipResult[0]; // [string, number]
var zipResultEleEle = zipResult[0][0]; // string

// #33559 and #33752

declare function f1<T1, T2>(values: [T1[], T2[]]): T1;
declare function f2<T1, T2>(values: readonly [T1[], T2[]]): T1;

let expected: "a";
expected = f1(undefined as ["a"[], "b"[]]);
expected = f2(undefined as ["a"[], "b"[]]);


//// [typeInferenceWithTupleType.js]
function combine(x, y) {
    return [x, y];
}
var combineResult = combine("string", 10);
var combineEle1 = combineResult[0]; // string
var combineEle2 = combineResult[1]; // number
function zip(array1, array2) {
    if (array1.length != array2.length) {
        return [[undefined, undefined]];
    }
    var length = array1.length;
    var zipResult;
    for (var i = 0; i < length; ++i) {
        zipResult.push([array1[i], array2[i]]);
    }
    return zipResult;
}
var zipResult = zip(["foo", "bar"], [5, 6]);
var zipResultEle = zipResult[0]; // [string, number]
var zipResultEleEle = zipResult[0][0]; // string
var expected;
expected = f1(undefined);
expected = f2(undefined);
