/// <reference path='fourslash.ts'/>

////interface IFoo {
////    a: number;
////}
////
////with (x) {
////    var y: IFoo = { /*1*/ };
////}

verify.completions({ marker: "1", exact: undefined });
