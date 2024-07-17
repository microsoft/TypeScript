// @strict: true

// Should be OK
const foo2 = {
    isNumber(): this is { b: string } {
        return true;
    },
};

// Still an error
const foo3 = {
    isNumber(x: any): x is this {
        return true;
    },
};
