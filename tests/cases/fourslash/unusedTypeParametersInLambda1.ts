/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// function f1() {
////     return <T>(x:number) => {x}
//// }

verify.codeFixAtPosition(`
function f1() {
    return (x:number) => {x}
}
`);
