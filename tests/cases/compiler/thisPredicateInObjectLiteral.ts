// @strict: true

// Should be OK
const foo2 = {
    isNumber(): this is { b: string } {
        return true;
    },
};