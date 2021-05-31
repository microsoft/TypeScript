/// <reference path='fourslash.ts' />

////class A {}
////class B extends A {
////    public [|constructor|]() {}
////}

verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_missing_super_call.message }
])

verify.codeFix({
    description: ts.Diagnostics.Add_missing_super_call.message,
    newFileContent:
`class A {}
class B extends A {
    public constructor() {
        super();
    }
}`
});

