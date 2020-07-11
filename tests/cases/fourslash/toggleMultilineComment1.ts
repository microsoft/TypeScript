// Simple multiline comment and uncomment.

//// let var1[| = 1;
//// let var2 = 2;
//// let var3 |]= 3;
////
//// let var4/* = 1;
//// let var5 [||]= 2;
//// let var6 */= 3;
////
//// [|/*let var7 = 1;
//// let var8 = 2;
//// let var9 = 3;*/|]
//// 
//// let var10[||] = 10;

verify.toggleMultilineComment(
    `let var1/* = 1;
let var2 = 2;
let var3 */= 3;

let var4 = 1;
let var5 = 2;
let var6 = 3;

let var7 = 1;
let var8 = 2;
let var9 = 3;

let var10/**/ = 10;`);