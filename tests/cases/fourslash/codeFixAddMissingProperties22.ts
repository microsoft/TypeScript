/// <reference path="fourslash.ts" />

// @lib: es2020
////const x: Iterable<number> = {}

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newFileContent:
`const x: Iterable<number> = {
    [Symbol.iterator]: function(): Iterator<number, any, any> {
        throw new Error("Function not implemented.");
    }
}`,
});
