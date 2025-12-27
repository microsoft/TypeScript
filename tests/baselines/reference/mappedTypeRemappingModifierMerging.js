//// [tests/cases/compiler/mappedTypeRemappingModifierMerging.ts] ////

//// [mappedTypeRemappingModifierMerging.ts]
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


//// [mappedTypeRemappingModifierMerging.js]
"use strict";
// Mapped types with key remapping should merge modifiers consistently
// when multiple keys map to the same output key
// Test that they are equivalent
var testOptional = { foo: null };
var testOptional2 = {};
var testRequired = { foo: null };
var testRequired2 = {};
// Both should be readonly
ro1.foo = null; // Error
ro2.foo = null; // Error


//// [mappedTypeRemappingModifierMerging.d.ts]
type RemapKeyToInitialPart<T> = {
    [K in keyof T as K extends `${infer First}.${infer _Rest}` ? First : K]: null;
};
type FirstOptional = RemapKeyToInitialPart<{
    "foo.bar"?: string;
    "foo.baz": number;
}>;
type FirstRequired = RemapKeyToInitialPart<{
    "foo.baz": number;
    "foo.bar"?: string;
}>;
declare const testOptional: FirstOptional;
declare const testOptional2: FirstOptional;
declare const testRequired: FirstRequired;
declare const testRequired2: FirstRequired;
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
