/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x = <div> 
////        <h1> </ /*1*/>
////        <d/*3*/iv> </ /*4*/>
////        <d/*5*/iv> </ /*6*/>
////        </ /*2*/>

goTo.marker("1");
verify.memberListCount(1);
verify.completionListContains('h1');

goTo.marker("2");
verify.memberListCount(1);
verify.completionListContains('div');

goTo.marker("3");
verify.memberListCount(0);

goTo.marker("4");
verify.memberListCount(1);
verify.completionListContains('div');

goTo.marker("5");
verify.memberListCount(0);

goTo.marker("6");
verify.memberListCount(1);
verify.completionListContains('div');