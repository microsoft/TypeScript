// @declaration: true
// @target: es2017
export const Foo0 = {
    get bar(): number { return 0; },
    set bar(value: number | string) { }
};

export const Foo1: {
    get bar(): number
    set bar(value: number | string)
} = Foo0; // Reuse Foo0 for conciseness

