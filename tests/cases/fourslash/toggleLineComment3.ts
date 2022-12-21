// Comment and uncomment ignores empty lines.

//// let var1[| = 1;
////
//// let var2 = 2;
////
//// let var3 |]= 3;
////
//// //let var4[| = 1;
////
//// //let var5 = 2;
////
//// //let var6 |]= 3;

verify.toggleLineComment(
    `//let var1 = 1;

//let var2 = 2;

//let var3 = 3;

let var4 = 1;

let var5 = 2;

let var6 = 3;`);