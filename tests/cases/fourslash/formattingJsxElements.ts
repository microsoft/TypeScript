/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////function () {
////    return (
////        <div className="commentBox" >
////Hello, World!/*autoformat*/
/////*indent*/
////        </div>
////    )
////}
////


format.document();
goTo.marker("autoformat");
verify.currentLineContentIs('            Hello, World!');
goTo.marker("indent");
verify.indentationIs(12);