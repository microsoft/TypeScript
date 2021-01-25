//// [initializerWithNonNullAssertion.ts]
// https://github.com/microsoft/TypeScript/issues/19577

function test(numbers: number[]) {
    let last;

    for (const n of numbers) {
        if (n % 2) {
            return n;
        }

        last = n;
    }

    return last!;
}


//// [initializerWithNonNullAssertion.js]
// https://github.com/microsoft/TypeScript/issues/19577
function test(numbers) {
    var last;
    for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
        var n = numbers_1[_i];
        if (n % 2) {
            return n;
        }
        last = n;
    }
    return last;
}
