/// <reference path='fourslash.ts' />

//// 
//// let obj1 =
//// { x: 10 };
//// 
//// let obj2 =
////     // leading trivia
//// { y: 10 };
//// 

format.document();
verify.currentFileContentIs(
`
let obj1 =
    { x: 10 };

let obj2 =
    // leading trivia
    { y: 10 };
`
);
