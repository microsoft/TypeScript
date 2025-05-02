//// [tests/cases/compiler/nonNullFullInference.ts] ////

//// [nonNullFullInference.ts]
// https://github.com/microsoft/TypeScript/issues/19577

function testNonNullInference(numbers: number[]) {
    let last;

    for (const n of numbers) {
        if (n % 2) {
            return n;
        }

        last = n;
    }

    last;
    last!;
}

function testNonNullInferenceWithArrays(numbers: number[]) {
    let result;
    const arr = [];

    for (const n of numbers) {
        if (n % 2) {
            return [n];
        }

        arr.push(n);
        result = arr;
    }

    result;
    result!;
}

//// [nonNullFullInference.js]
// https://github.com/microsoft/TypeScript/issues/19577
function testNonNullInference(numbers) {
    var last;
    for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
        var n = numbers_1[_i];
        if (n % 2) {
            return n;
        }
        last = n;
    }
    last;
    last;
}
function testNonNullInferenceWithArrays(numbers) {
    var result;
    var arr = [];
    for (var _i = 0, numbers_2 = numbers; _i < numbers_2.length; _i++) {
        var n = numbers_2[_i];
        if (n % 2) {
            return [n];
        }
        arr.push(n);
        result = arr;
    }
    result;
    result;
}
