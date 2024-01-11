// @strict: true
// @noEmit: true

// From #47357

function foo<T extends Record<string | symbol, any>>(target: T, p: string | symbol) {
    target[p] = ""; // error
}

function foo2<T extends number[] & { [s: string]: number | string }>(target: T, p: string | number) {
    target[p] = 1; // error
    target[1] = 1; // ok
}