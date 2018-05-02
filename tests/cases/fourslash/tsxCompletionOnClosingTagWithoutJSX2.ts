/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x1 = <div>
////    <h1> Hello world </ /*2*/>
////    </ /*1*/>

verify.completions({ at: "1", are: ["div"] }, { at: "2", are: ["h1"] });
