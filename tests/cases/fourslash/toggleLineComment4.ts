// If at least one line is not commented then comment all lines again.

////  //const a[| = 1;
//// const b = 2
////  //const c =|] 3;
////
//// ////const d[| = 4;
//// //const e = 5;
//// ////const e =|] 6;

verify.toggleLineComment(
    `// //const a = 1;
//const b = 2
// //const c = 3;

//const d = 4;
const e = 5;
//const e = 6;`);