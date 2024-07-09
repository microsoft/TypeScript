/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
////class Foo {
////    test() {
////        return true;
////    }
////    run() {
////        this.test/**/ ? console.log('test') : undefined;
////    }
////}

verify.codeFixAvailable([
    { description: ts.Diagnostics.Add_missing_call_parentheses.message }
]);

verify.codeFix({
    description: ts.Diagnostics.Add_missing_call_parentheses.message,
    index: 0,
    newFileContent:
`class Foo {
    test() {
        return true;
    }
    run() {
        this.test() ? console.log('test') : undefined;
    }
}`,
});

