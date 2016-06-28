/// <reference path='fourslash.ts'/>

// Function overloads should be highlighted together.

////function [|foo|](x: string);
////function [|foo|](x: string, y: number) {
////    [|foo|]('', 43);
////}

verify.rangesReferenceEachOther();
