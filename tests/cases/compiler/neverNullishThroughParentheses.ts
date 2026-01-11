// @strict: true

// Repro for issue where "never nullish" checks miss "never nullish" through parentheses

const x: { y: string | undefined } | undefined = undefined as any;

// Both should error - both expressions are guaranteed to be "oops"
const foo = x?.y ?? `oops` ?? "";
const bar = (x?.y ?? `oops`) ?? "";

// Additional test cases with various levels of nesting
const baz = ((x?.y ?? `oops`)) ?? "";
const qux = (((x?.y ?? `oops`))) ?? "";

// Test with different types
const str1 = ("literal") ?? "fallback";
const str2 = (("nested")) ?? "fallback";
const nested = ("a" ?? "b") ?? "c";
