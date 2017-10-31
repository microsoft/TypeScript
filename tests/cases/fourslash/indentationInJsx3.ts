/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////function foo () {
////   return (
////        <div>
////hello
////goodbye
////        </div>
////    )
////}

goTo.position(21);
verify.textAtCaretIs("return");
goTo.position(38);
verify.textAtCaretIs("<div>");
goTo.position(44);
verify.textAtCaretIs("hello");
goTo.position(50);
verify.textAtCaretIs("goodbye");

format.document();

goTo.position(21);
verify.textAtCaretIs("return");
goTo.position(38);
verify.textAtCaretIs("<div>");
goTo.position(56);
verify.textAtCaretIs("hello");
goTo.position(74);
verify.textAtCaretIs("goodbye");