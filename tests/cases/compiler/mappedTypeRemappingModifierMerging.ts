// @strict: true
// @declaration: true

// Mapped types with key remapping should merge modifiers consistently
// when multiple keys map to the same output key

type RemapKeyToInitialPart<T> = {
    [K in keyof T as K extends `${infer First}.${infer _Rest}` ? First : K]: null;
};

// Both should produce { foo?: null } since at least one input is optional
type FirstOptional = RemapKeyToInitialPart<{
    "foo.bar"?: string;
    "foo.baz": number;
}>;

type FirstRequired = RemapKeyToInitialPart<{
    "foo.baz": number;
    "foo.bar"?: string;
}>;

// Test that they are equivalent
const testOptional: FirstOptional = { foo: null };
const testOptional2: FirstOptional = {};

const testRequired: FirstRequired = { foo: null };
const testRequired2: FirstRequired = {};

// Readonly should work the same way
type RemapWithReadonly<T> = {
    [K in keyof T as K extends `${infer First}.${string}` ? First : K]: null;
};

type FirstReadonly = RemapWithReadonly<{
    readonly "foo.bar": string;
    "foo.baz": number;
}>;

type SecondReadonly = RemapWithReadonly<{
    "foo.baz": number;
    readonly "foo.bar": string;
}>;

declare const ro1: FirstReadonly;
declare const ro2: SecondReadonly;

// Both should be readonly
ro1.foo = null; // Error
ro2.foo = null; // Error
