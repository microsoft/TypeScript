// @noImplicitAny: true
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
