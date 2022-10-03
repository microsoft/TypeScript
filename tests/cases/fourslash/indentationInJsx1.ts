/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////(function () {
////    return (
////        <div>
////            <div>
////            </div>
////            /*indent2*/
////        </div>
////    )
////})


format.document();
goTo.marker("indent2");
verify.indentationIs(12);