/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
////class Foo {
////    #test = () => true;
////    run() {
////        if (this.#test) {
////            console.log('test')
////        }
////    }
////}
////
////function foo() {
////    function test() { return Math.random() > 0.5; }
////    test ? console.log('test') : undefined;
////}
////
////function foo() {
////    const x = {
////        foo: {
////            bar() { return true; }
////        }
////    }
////    x.foo.bar ? console.log('test') : undefined;
////    if (x.foo.bar) {}
////}

verify.codeFixAll({
    fixAllDescription: ts.Diagnostics.Add_all_missing_call_parentheses.message,
    fixId: "fixMissingCallParentheses",
    newFileContent:
`class Foo {
    #test = () => true;
    run() {
        if (this.#test()) {
            console.log('test')
        }
    }
}

function foo() {
    function test() { return Math.random() > 0.5; }
    test() ? console.log('test') : undefined;
}

function foo() {
    const x = {
        foo: {
            bar() { return true; }
        }
    }
    x.foo.bar() ? console.log('test') : undefined;
    if (x.foo.bar()) {}
}`,
});
