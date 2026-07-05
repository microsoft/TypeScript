// @strict: true

function test1(x: readonly string[] | string) {
    if (Array.isArray(x)) {
        x; // should be readonly string[]
    }
}

function test2(x: readonly number[] | number) {
    if (Array.isArray(x)) {
        x; // should be readonly number[]
        x[0]; // should be number
    }
}

function test3(x: string[] | string) {
    if (Array.isArray(x)) {
        x; // should still be string[] (not readonly)
    }
}

function test4(x: unknown) {
    if (Array.isArray(x)) {
        x; // should still be any[] (existing behavior)
    }
}
