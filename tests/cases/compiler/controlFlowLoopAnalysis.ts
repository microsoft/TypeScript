// @strictNullChecks: true

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
