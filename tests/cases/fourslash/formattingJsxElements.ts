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
////function () {
////    return <div
////className=""/*attrAutoformat*/
/////*attrIndent*/
////        >/*danglingBraketAutoformat*/
////        </div>
////}


format.document();
goTo.marker("autoformat");
verify.currentLineContentIs('            Hello, World!');
goTo.marker("indent");
verify.indentationIs(12);

goTo.marker("attrAutoformat");
verify.currentLineContentIs('        className="">');
goTo.marker("attrIndent");
verify.indentationIs(8);
goTo.marker("danglingBracketAutoformat")
verify.currentLineContentIs("    >");