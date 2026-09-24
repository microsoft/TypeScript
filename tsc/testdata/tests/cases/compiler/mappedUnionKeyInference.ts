// @strict: true
// @noEmit: true

declare function inferMapped<Value>(source: { [Key in keyof Value | "fixed"]: Value }): Value;

const mapped = inferMapped({
    fixed: { fixed: 1, other: "text" },
    other: { fixed: "text", other: 1 },
});

const fixed: unknown = mapped.fixed;
const other: unknown = mapped.other;

declare function inferFixed<Value, Extra>(source: {
    [Key in keyof Extra | "fixed"]: Key extends "fixed" ? Value : Extra[Key & keyof Extra];
}): Value;

const fixedValue = inferFixed({ fixed: { count: 1 }, other: "text" });
const count: number = fixedValue.count;

declare function inferWithCallback<Value>(source: {
    [Key in keyof Value | "fixed"]: { value: Value; callback?: (value: Value) => void };
}): Value;

const withCallback = inferWithCallback({
    fixed: {
        value: { fixed: 1, other: "text" },
        callback: value => { const fixed: unknown = value.fixed; },
    },
    other: { value: { fixed: "text", other: 1 } },
});
const callbackFixed: unknown = withCallback.fixed;