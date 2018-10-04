////interface I {}
////
////function f<T>(t: T): number {
////    return t.foo;
////}
////
////function g<T extends I>(t: T): number {
////    return t.bar;
////}

// No code fix for "foo"

verify.codeFixAvailable([
    { description: "Declare property 'bar'" }, { description: "Add index signature for property 'bar'" },
])

verify.codeFix({
    description: "Declare property 'bar'",
    index: 0,
    newFileContent:
`interface I {
    bar: any;
}

function f<T>(t: T): number {
    return t.foo;
}

function g<T extends I>(t: T): number {
    return t.bar;
}`,
});
