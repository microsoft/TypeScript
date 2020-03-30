/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
////function foo() {
////    const x = {
////        foo: {
////            bar() { return true; }
////        }
////    }
////    if (x.foo.bar/**/) {
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
    const x = {
        foo: {
            bar() { return true; }
        }
    }
    if (x.foo.bar()) {
        console.log('test')
    }
}`,
});
