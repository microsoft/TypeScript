/// <reference path="fourslash.ts" />

// @noUnusedParameters: true
////export type Foo<
////    T1 extends any,
////    T2 extends any
////> = () => void;

verify.codeFix({
    description: ts.Diagnostics.Remove_type_parameters.message,
    newFileContent: "export type Foo = () => void;"
});
