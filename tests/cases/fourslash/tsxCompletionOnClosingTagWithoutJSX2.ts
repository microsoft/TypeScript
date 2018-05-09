/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x1 = <div>
////    <h1> Hello world </ /*2*/>
////    </ /*1*/>

verify.completions({ marker: "1", exact: ["div"] }, { marker: "2", exact: ["h1"] });
