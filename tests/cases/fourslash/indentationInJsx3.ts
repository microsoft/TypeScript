/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////function foo () {
////   return (
////        <div>
/////*0*/hello
/////*1*/goodbye
////        </div>
////    )
////}

goTo.marker('0');
verify.currentLineContentIs("hello");
goTo.marker('1');
verify.currentLineContentIs("goodbye");

format.document();

goTo.marker('0');
verify.currentLineContentIs("            hello");
goTo.marker('1');
verify.currentLineContentIs("            goodbye");