/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
////function foo(fn: () => boolean) {
////    fn/**/ ? console.log('test') : undefined;
////}

verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_missing_call_parentheses.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_missing_call_parentheses.message,
    index: 0,
    newFileContent:
`function foo(fn: () => boolean) {
    fn() ? console.log('test') : undefined;
}`,
});
