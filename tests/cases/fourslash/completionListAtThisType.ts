/// <reference path='fourslash.ts'/>

////class Test {
////    foo() {}
////
////    bar() {
////        this.baz(this, "/*1*/");
////
////        const t = new Test()
////        this.baz(t, "/*2*/");
////    }
////
////    baz<T>(a: T, k: keyof T) {}
////}

verify.completions({
    marker: ["1", "2"],
    exact: ["foo", "bar", "baz"]
});
