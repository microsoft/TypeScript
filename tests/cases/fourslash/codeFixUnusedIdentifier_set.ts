/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////class C {
////    set x(value: number) {}
////}

// No codefix to remove parameter, since setter must have a parameter
verify.codeFixAvailable([{ description: "Prefix 'value' with an underscore" }]);

verify.codeFix({
    description: "Prefix 'value' with an underscore",
    newFileContent:
`class C {
    set x(_value: number) {}
}`,
});
