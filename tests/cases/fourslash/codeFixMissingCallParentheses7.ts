/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
////function foo() {
////    function test() { return Math.random() > 0.5; }
////    if (test/**/) {
////        console.log('test')
////    }
////}

verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_missing_call_parentheses.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_missing_call_parentheses.message,
    index: 0,
    newFileContent:
`function foo() {
    function test() { return Math.random() > 0.5; }
    if (test()) {
        console.log('test')
    }
}`,
});
