/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x1 = <div>
////    <h1> Hello world </ /*2*/>
////    </ /*1*/>

goTo.marker("1");
verify.completionListCount(1);
verify.completionListContains('div');

goTo.marker("2");
verify.completionListCount(1);
verify.completionListContains('h1')
