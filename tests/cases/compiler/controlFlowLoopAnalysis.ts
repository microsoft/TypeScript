// @strictNullChecks: true
// @noImplicitAny: true

// Repro from #8418

let cond: boolean;

function foo(x: number): number { return 1; }

function test1() {
    let x: number | undefined;
    while (cond) {
        while (cond) {
            while (cond) {
                x = foo(x);
            }
        }
        x = 1;
    }
}

// Repro from #8418

function test2() {
    let x: number | undefined;
    x = 1;
    while (cond) {
        while (cond) {
            x = foo(x);
        }
    }
}

// Repro from #8511

function mapUntilCant<a, b>(
    values: a[],
    canTake: (value: a, index: number) => boolean,
    mapping: (value: a, index: number) => b
): b[] {
    let result: b[] = [];
    for (let index = 0, length = values.length; index < length; index++) {
        let value = values[index];
        if (canTake(value, index)) {
            result.push(mapping(value, index));
        } else {
            return result;
        }
    }
    return result;
}
