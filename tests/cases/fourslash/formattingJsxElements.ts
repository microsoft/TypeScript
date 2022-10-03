/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////function foo0() {
////    return (
////        <div className="commentBox" >
////Hello, World!/*autoformat*/
/////*indent*/
////        </div>
////    )
////}
////
////function foo1() {
////    return (
////        <div className="commentBox" data-id="test">
////Hello, World!/*autoformat1*/
/////*indent1*/
////        </div>
////    )
////}
////
////function foo2() {
////    return (
////        <div data-name="commentBox"
////class1= {/*1*/
////}>/*2*/
////Hello, World!/*autoformat2*/
/////*indent2*/
////        </div>
////    )
////}
////function foo3() {
////    return (
////        <jsx-element className="commentBox"
////            class2= {/*3*/
////            }>/*4*/
////            Hello, World!/*autoformat3*/
////        /*indent3*/
////        </jsx-element>
////    )
////}
////function foo4() {
////    return (
////        <jsx-element className="commentBox"
////            class3= {/*5*/
////            }/>/*6*/
////    )
////}
////
////const bar = (
////    <>
////    /*fragmentChildIndent*/<p>text</p>
////    </>
////);
////
////const bar2 = <>
////    <p>text</p>
////    /*fragmentClosingTagIndent*/</>;
////
////(function () {
////    return <div
////className=""/*attrAutoformat*/
/////*attrIndent*/
////id={
////"abc" + "cde"/*expressionAutoformat*/
/////*expressionIndent*/
////}
////        >/*danglingBracketAutoformat*/
////        </div>/*closingTagAutoformat*/
////})
////
////let h5 = <h5>
////<span>/*childJsxElementAutoformat*/
/////*childJsxElementIndent*/
////<span></span>/*grandchildJsxElementAutoformat*/
////</span>/*containedClosingTagAutoformat*/
////</h5>;
////
////<div>,{integer}</div>;/*commaInJsxElement*/
////<div>,   {integer}</div>;/*commaInJsxElement2*/
////<>,{integer}</>;/*commaInJsxFragment*/
////<>,   {integer}</>;/*commaInJsxFragment2*/
////<span>)</span>;/*closingParenInJsxElement*/
////<span>)   </span>;/*closingParenInJsxElement2*/
////<>)</>;/*closingParenInJsxFragment*/
////<>)   </>;/*closingParenInJsxFragment2*/
////<Router        routes      =        { 3 }   /      >;/*jsxExpressionSpaces*/
////<Router routes={                (3)    } />;/*jsxExpressionSpaces2*/
////<Router routes={() => {}}/*jsxExpressionSpaces3*/
/////>;/*jsxDanglingSelfClosingToken*/

format.document();
goTo.marker("autoformat");
verify.currentLineContentIs('            Hello, World!');
goTo.marker("indent");
verify.indentationIs(12);

goTo.marker("autoformat1");
verify.currentLineContentIs('            Hello, World!');
goTo.marker("indent1");
verify.indentationIs(12);

goTo.marker("1");
verify.currentLineContentIs('            class1={');
goTo.marker("2");
verify.currentLineContentIs('            }>');

goTo.marker("autoformat2");
verify.currentLineContentIs('            Hello, World!');
goTo.marker("indent2");
verify.indentationIs(12);

goTo.marker("3");
verify.currentLineContentIs('            class2={');
goTo.marker("4");
verify.currentLineContentIs('            }>');

goTo.marker("autoformat3");
verify.currentLineContentIs('            Hello, World!');
goTo.marker("indent3");
verify.indentationIs(12);

goTo.marker("5");
verify.currentLineContentIs('            class3={');
goTo.marker("6");
verify.currentLineContentIs('            } />');

goTo.marker("fragmentChildIndent");
verify.currentLineContentIs("        <p>text</p>");
goTo.marker("fragmentClosingTagIndent");
verify.currentLineContentIs("</>;");

goTo.marker("attrAutoformat");
verify.currentLineContentIs('        className=""');
goTo.marker("attrIndent");
verify.indentationIs(8);
goTo.marker("expressionAutoformat");
verify.currentLineContentIs('            "abc" + "cde"');
goTo.marker("expressionIndent");
verify.indentationIs(12);

goTo.marker("danglingBracketAutoformat")
verify.currentLineContentIs("    >");
goTo.marker("closingTagAutoformat");
verify.currentLineContentIs("    </div>");

goTo.marker("childJsxElementAutoformat");
verify.currentLineContentIs("    <span>");
goTo.marker("childJsxElementIndent");
verify.indentationIs(8);
goTo.marker("grandchildJsxElementAutoformat");
verify.currentLineContentIs("        <span></span>");
goTo.marker("containedClosingTagAutoformat");
verify.currentLineContentIs("    </span>");

goTo.marker("commaInJsxElement");
verify.currentLineContentIs("<div>,{integer}</div>;");
goTo.marker("commaInJsxElement2");
verify.currentLineContentIs("<div>,   {integer}</div>;");
goTo.marker("commaInJsxFragment");
verify.currentLineContentIs("<>,{integer}</>;");
goTo.marker("commaInJsxFragment2");
verify.currentLineContentIs("<>,   {integer}</>;");
goTo.marker("closingParenInJsxElement");
verify.currentLineContentIs("<span>)</span>;");
goTo.marker("closingParenInJsxElement2");
verify.currentLineContentIs("<span>)   </span>;");
goTo.marker("closingParenInJsxFragment");
verify.currentLineContentIs("<>)</>;");
goTo.marker("closingParenInJsxFragment2");
verify.currentLineContentIs("<>)   </>;");
goTo.marker("jsxExpressionSpaces");
verify.currentLineContentIs("<Router routes={3} />;");
goTo.marker("jsxExpressionSpaces2");
verify.currentLineContentIs("<Router routes={(3)} />;");
goTo.marker("jsxExpressionSpaces3");
verify.currentLineContentIs("<Router routes={() => { }}");
goTo.marker("jsxDanglingSelfClosingToken");
verify.currentLineContentIs("/>;");