//// [shouldNotToPropertySignatureAccessor.ts]
export const Foo0 = {
    get bar(): number { return 0; },
    set bar(value: number | string) { }
};

export const Foo1: {
    get bar(): number
    set bar(value: number | string)
} = Foo0; // Reuse Foo0 for conciseness



//// [shouldNotToPropertySignatureAccessor.js]
export const Foo0 = {
    get bar() { return 0; },
    set bar(value) { }
};
export const Foo1 = Foo0; // Reuse Foo0 for conciseness


//// [shouldNotToPropertySignatureAccessor.d.ts]
export declare const Foo0: {
    get bar(): number;
    set bar(value: number | string);
};
export declare const Foo1: {
    get bar(): number;
    set bar(value: number | string);
};
