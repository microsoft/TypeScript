/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////function () {
////    return (
////        <div className="commentBox" >
////Hello, World!/*autoformat*/
/////*indent*/
////        </div>/*closingTagAutoformat*/
////    )
////}
////
////function () {
////    return <div
////className=""/*attrAutoformat*/
/////*attrIndent*/
////id={
////"abc" + "cde"/*expressionAutoformat*/
/////*expressionIndent*/
////}
////        >/*danglingBracketAutoformat*/
////        </div>
////}
////
////let h5 = <h5>
////<span>/*childJsxElementAutoformat*/
/////*childJsxElementIndent*/
////<span></span>/*grandchildJsxElementAutoformat*/
////</span>/*containedClosingTagAutoformat*/
////</h5>

format.document();
goTo.marker("autoformat");
verify.currentLineContentIs('            Hello, World!');
goTo.marker("indent");
verify.indentationIs(12);
goTo.marker("closingTagAutoformat");
verify.currentLineContentIs("        </div>");

goTo.marker("attrAutoformat");
verify.currentLineContentIs('        className=""');
goTo.marker("attrIndent");
verify.indentationIs(8);
goTo.marker("expressionAutoformat");
verify.currentLineContentIs('            "abc" + "cde"');
goTo.marker("expressionIndent");
verify.indentationIs(12);


goTo.marker("danglingBracketAutoformat")
// TODO: verify.currentLineContentIs("    >");
verify.currentLineContentIs("        >");


goTo.marker("childJsxElementAutoformat");
verify.currentLineContentIs("    <span>");
goTo.marker("childJsxElementIndent");
verify.indentationIs(8);
goTo.marker("grandchildJsxElementAutoformat");
verify.currentLineContentIs("        <span></span>");
goTo.marker("containedClosingTagAutoformat");
verify.currentLineContentIs("    </span>");