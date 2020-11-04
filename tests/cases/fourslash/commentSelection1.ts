// Simple comment selection cases.

//// let var1[| = 1;
//// let var2 = 2;
//// let var3 |]= 3;
//// 
//// let var4[| = 4;|]
//// 
//// let [||]var5 = 5;
//// 
//// //let var6[| = 6;
//// //let var7 = 7;
//// //let var8 |]= 8;

verify.commentSelection(
    `//let var1 = 1;
//let var2 = 2;
//let var3 = 3;

let var4/* = 4;*/

//let var5 = 5;

////let var6 = 6;
////let var7 = 7;
////let var8 = 8;`);