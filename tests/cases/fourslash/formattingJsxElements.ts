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
verify.currentLineContentIs('            class1= {');
goTo.marker("2");
verify.currentLineContentIs('            }>');

goTo.marker("autoformat2");
verify.currentLineContentIs('            Hello, World!');
goTo.marker("indent2");
verify.indentationIs(12);

goTo.marker("3");
verify.currentLineContentIs('            class2= {');
goTo.marker("4");
verify.currentLineContentIs('            }>');

goTo.marker("autoformat3");
verify.currentLineContentIs('            Hello, World!');
goTo.marker("indent3");
verify.indentationIs(12);

goTo.marker("5");
verify.currentLineContentIs('            class3= {');
goTo.marker("6");
verify.currentLineContentIs('            }/>');
