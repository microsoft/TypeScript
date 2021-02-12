/// <reference path='fourslash.ts'/>

// @noPropertyAccessFromIndexSignature: true
//// declare let x: { y: { [x: string]: string } };
//// x.y.yadda;

verify.codeFix({
    description: [ts.Diagnostics.Use_element_access_for_0.message, 'yadda'],
    index: 0,
    newFileContent:
`declare let x: { y: { [x: string]: string } };
x.y["yadda"];`,
});
