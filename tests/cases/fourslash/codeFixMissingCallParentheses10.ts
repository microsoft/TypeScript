/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
////class Foo {
////    #test = () => true;
////    run() {
////        if (this.#test/**/) {
////            console.log('test')
////        }
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
    #test = () => true;
    run() {
        if (this.#test()) {
            console.log('test')
        }
    }
}`,
});
