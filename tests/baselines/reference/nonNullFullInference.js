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
    let last;
    for (const n of numbers) {
        if (n % 2) {
            return n;
        }
        last = n;
    }
    last;
    last;
}
function testNonNullInferenceWithArrays(numbers) {
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
    result;
}
