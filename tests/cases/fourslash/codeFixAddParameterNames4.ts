/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function fn(f: (...number[]) => unknown) {}

verify.codeFix({
    description: ts.Diagnostics.Add_parameter_name.message,
    newFileContent: `function fn(f: (...arg0: number[]) => unknown) {}`,
});
