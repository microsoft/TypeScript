// Simple comment selection cases.

//// //let var1[| = 1;
//// //let var2 = 2;
//// //let var3 |]= 3;
//// 
//// //let var4[| = 4;
//// /*let var5 = 5;*/
//// //let var6 = 6;
//// 
//// let var7 |]= 7;
////
//// let var8/* = 1;
//// let var9 [||]= 2;
//// let var10 */= 3;
////
//// let var11[||]/* = 1;
//// let var12 = 2;
//// let var13 */= 3;
//// 
//// ////let var14 [||]= 14;
////
//// [|//let var15 = 15;
//// //let var16 = 16;
//// |]//let var17 = 17;

verify.uncommentSelection(
    `let var1 = 1;
let var2 = 2;
let var3 = 3;

let var4 = 4;
let var5 = 5;
let var6 = 6;

let var7 = 7;

let var8 = 1;
let var9 = 2;
let var10 = 3;

let var11 = 1;
let var12 = 2;
let var13 = 3;

//let var14 = 14;

let var15 = 15;
let var16 = 16;
//let var17 = 17;`);