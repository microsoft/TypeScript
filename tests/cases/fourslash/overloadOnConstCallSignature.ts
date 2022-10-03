/// <reference path='fourslash.ts'/>

////var foo: {
////    (name: string): string;
////    (name: 'order'): string;
////    (name: 'content'): string;
////    (name: 'done'): string;
////}

////var /*2*/x = foo(/*1*/

verify.signatureHelp({
    marker: "1",
    overloadsCount: 4,
    text: 'foo(name: "order"): string',
})
edit.insert('"hi"');

verify.quickInfoAt("2", "var x: string");
